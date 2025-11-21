import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  // Return the key if available (it's safe to expose as it should be restricted on Google's side)
  if (apiKey && apiKey.trim().length > 0) {
    return NextResponse.json({ key: apiKey });
  }
  
  return NextResponse.json({ key: null }, { status: 404 });
}

