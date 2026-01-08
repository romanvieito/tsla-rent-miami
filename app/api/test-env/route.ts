import { NextResponse } from 'next/server';

export async function GET() {
  const clientToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  const serverToken = process.env.MIXPANEL_TOKEN;
  const nodeEnv = process.env.NODE_ENV;

  console.log('Environment check:', {
    clientToken: clientToken ? `${clientToken.substring(0, 10)}...` : 'NOT SET',
    serverToken: serverToken ? `${serverToken.substring(0, 10)}...` : 'NOT SET',
    nodeEnv,
    clientTokenLength: clientToken?.length,
    serverTokenLength: serverToken?.length,
  });  return NextResponse.json({
    environment: {
      nodeEnv,
      clientToken: clientToken ? 'SET' : 'NOT SET',
      serverToken: serverToken ? 'SET' : 'NOT SET',
      clientTokenLength: clientToken?.length,
      serverTokenLength: serverToken?.length,
    },
    timestamp: new Date().toISOString(),
  });
}
