import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    mixpanelClientToken: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    mixpanelServerToken: !!process.env.MIXPANEL_TOKEN,
    baseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
    databaseUrl: !!process.env.DATABASE_URL,
    stripeSecret: !!process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    nodeEnv: process.env.NODE_ENV,
  };

  const allHealthy = Object.entries(checks)
    .filter(([key]) => key !== 'nodeEnv')
    .every(([, value]) => value === true);

  return NextResponse.json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks: {
      ...checks,
      mixpanelClientTokenLength: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN?.length,
      mixpanelServerTokenLength: process.env.MIXPANEL_TOKEN?.length,
    },
    timestamp: new Date().toISOString(),
  }, { status: allHealthy ? 200 : 500 });
}