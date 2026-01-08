import { NextResponse } from 'next/server';

// Simple sanity endpoint to verify the API layer is reachable in a deployed environment.
// (Avoids having an empty `app/api/test-env` segment which can break Next build routing.)
export async function GET() {
  return NextResponse.json({ ok: true });
}

