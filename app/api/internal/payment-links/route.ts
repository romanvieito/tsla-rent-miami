import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { createOneTimePaymentLink, toCents } from '@/lib/stripe-payment-links';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 15;
const IDEMPOTENCY_TTL_MS = 15 * 60_000;

type PaymentLinkRequestBody = {
  amountUsd?: number | string;
  description?: string;
  externalRequestId?: string;
};

type SuccessResponse = {
  ok: true;
  paymentLinkId: string;
  paymentLinkUrl: string;
  amountUsd: number;
  currency: 'usd';
  createdAt: string;
};

const rateLimitHits = new Map<string, number[]>();
const idempotencyCache = new Map<string, { expiresAt: number; response: SuccessResponse }>();

function cleanEnvValue(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function parseRequestBody(value: unknown): PaymentLinkRequestBody | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  return value as PaymentLinkRequestBody;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) {
    return 'unknown';
  }
  return forwardedFor.split(',')[0]?.trim() || 'unknown';
}

function makeCallerKey(request: Request, token: string): string {
  const tokenHash = createHash('sha256').update(token).digest('hex');
  return `${tokenHash}:${getClientIp(request)}`;
}

function isRateLimited(callerKey: string, now: number): boolean {
  const recentHits = (rateLimitHits.get(callerKey) || []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recentHits.push(now);
  rateLimitHits.set(callerKey, recentHits);
  return recentHits.length > RATE_LIMIT_MAX_REQUESTS;
}

function getCachedResponse(key: string, now: number): SuccessResponse | null {
  const cached = idempotencyCache.get(key);
  if (!cached) {
    return null;
  }
  if (cached.expiresAt <= now) {
    idempotencyCache.delete(key);
    return null;
  }
  return cached.response;
}

function setCachedResponse(key: string, response: SuccessResponse, now: number) {
  idempotencyCache.set(key, {
    response,
    expiresAt: now + IDEMPOTENCY_TTL_MS,
  });
}

function getBearerToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return null;
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return null;
  }
  return token.trim();
}

function tokensMatch(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const expectedTokenRaw = process.env.INTERNAL_API_TOKEN;
  const expectedToken = expectedTokenRaw ? cleanEnvValue(expectedTokenRaw) : '';

  if (!expectedToken) {
    return NextResponse.json(
      { ok: false, error: 'Internal API is not configured' },
      { status: 500 }
    );
  }

  const providedToken = getBearerToken(request);
  if (!providedToken || !tokensMatch(providedToken, expectedToken)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const now = Date.now();
  const callerKey = makeCallerKey(request, providedToken);
  if (isRateLimited(callerKey, now)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  let jsonBody: unknown;
  try {
    jsonBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON payload' }, { status: 400 });
  }

  const payload = parseRequestBody(jsonBody);
  if (!payload) {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const externalRequestId = payload.externalRequestId?.trim();
  if (payload.externalRequestId !== undefined && !externalRequestId) {
    return NextResponse.json(
      { ok: false, error: 'externalRequestId must be a non-empty string when provided' },
      { status: 400 }
    );
  }

  if (externalRequestId && externalRequestId.length > 128) {
    return NextResponse.json(
      { ok: false, error: 'externalRequestId is too long (max 128 chars)' },
      { status: 400 }
    );
  }

  if (payload.amountUsd === undefined || payload.amountUsd === null) {
    return NextResponse.json({ ok: false, error: 'amountUsd is required' }, { status: 400 });
  }

  if (payload.description !== undefined && typeof payload.description !== 'string') {
    return NextResponse.json({ ok: false, error: 'description must be a string' }, { status: 400 });
  }

  if (typeof payload.amountUsd !== 'number' && typeof payload.amountUsd !== 'string') {
    return NextResponse.json(
      { ok: false, error: 'amountUsd must be a number or numeric string' },
      { status: 400 }
    );
  }

  try {
    toCents(payload.amountUsd);
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Invalid amountUsd' },
      { status: 400 }
    );
  }

  if (externalRequestId) {
    const cachedResponse = getCachedResponse(externalRequestId, now);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }
  }

  try {
    const link = await createOneTimePaymentLink({
      amountUsd: payload.amountUsd,
      description: payload.description,
      externalRequestId,
    });

    const responseBody: SuccessResponse = {
      ok: true,
      paymentLinkId: link.id,
      paymentLinkUrl: link.url,
      amountUsd: link.amountUsd,
      currency: link.currency,
      createdAt: link.createdAt,
    };

    if (externalRequestId) {
      setCachedResponse(externalRequestId, responseBody, now);
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json(
      { ok: false, error: message === 'amountUsd is required' ? 'Invalid request' : message },
      { status: 500 }
    );
  }
}
