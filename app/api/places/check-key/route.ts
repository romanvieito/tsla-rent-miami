import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  // Check if key exists and is not empty
  const available = Boolean(apiKey && apiKey.trim().length > 0);
  
  return NextResponse.json({ available });
}

