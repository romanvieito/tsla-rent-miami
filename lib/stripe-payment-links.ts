import Stripe from 'stripe';

const DEFAULT_DESCRIPTION = 'Tesla rental - Miami';
const STRIPE_API_VERSION = '2025-12-15.clover';

let stripeClient: Stripe | null = null;

function sanitizeSecret(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function getDefaultDescription(): string {
  const fromEnv = process.env.PAYMENT_LINK_DEFAULT_DESCRIPTION;
  if (!fromEnv) {
    return DEFAULT_DESCRIPTION;
  }

  const clean = sanitizeSecret(fromEnv);
  return clean || DEFAULT_DESCRIPTION;
}

export function getStripeClient(): Stripe {
  if (stripeClient) {
    return stripeClient;
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  const cleanKey = sanitizeSecret(key);
  if (!cleanKey.startsWith('sk_')) {
    throw new Error('STRIPE_SECRET_KEY appears to be invalid (must start with sk_)');
  }

  stripeClient = new Stripe(cleanKey, {
    apiVersion: STRIPE_API_VERSION,
  });

  return stripeClient;
}

export function toCents(amountUsd: number | string): number {
  const raw = typeof amountUsd === 'number' ? amountUsd.toString() : amountUsd.trim();

  if (!raw) {
    throw new Error('amountUsd is required');
  }

  if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
    throw new Error('amountUsd must be a positive number with up to 2 decimals');
  }

  const [wholePart, decimalPart = ''] = raw.split('.');
  const whole = Number.parseInt(wholePart, 10);
  const centsPart = Number.parseInt(decimalPart.padEnd(2, '0'), 10);
  const cents = whole * 100 + centsPart;

  if (!Number.isSafeInteger(cents) || cents <= 0) {
    throw new Error('amountUsd must be greater than 0');
  }

  return cents;
}

export type CreateOneTimePaymentLinkInput = {
  amountUsd: number | string;
  description?: string;
  externalRequestId?: string;
};

export type CreatedPaymentLink = {
  id: string;
  url: string;
  amountUsd: number;
  currency: 'usd';
  createdAt: string;
};

export async function createOneTimePaymentLink(
  input: CreateOneTimePaymentLinkInput
): Promise<CreatedPaymentLink> {
  const stripe = getStripeClient();
  const amountCents = toCents(input.amountUsd);
  const description = input.description?.trim() || getDefaultDescription();

  const paymentLink = await stripe.paymentLinks.create(
    {
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
            product_data: {
              name: description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        kind: 'internal-one-time-payment-link',
        ...(input.externalRequestId ? { externalRequestId: input.externalRequestId } : {}),
      },
    },
    input.externalRequestId
      ? {
          idempotencyKey: `internal-payment-link:${input.externalRequestId}`,
        }
      : undefined
  );

  return {
    id: paymentLink.id,
    url: paymentLink.url,
    amountUsd: Number((amountCents / 100).toFixed(2)),
    currency: 'usd',
    createdAt: new Date().toISOString(),
  };
}
