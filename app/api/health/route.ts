import { NextResponse } from 'next/server';

const cleanEnvVar = (value: string | undefined): string | undefined => {
  if (!value) return value;
  // Remove surrounding quotes and whitespace
  let cleaned = value.trim();
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1);
  }
  // Remove any newlines or carriage returns
  cleaned = cleaned.replace(/[\r\n]/g, '');
  return cleaned;
};

export async function GET() {
  const checks = {
    mixpanelClientToken: !!cleanEnvVar(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN),
    mixpanelServerToken: !!cleanEnvVar(process.env.MIXPANEL_TOKEN),
    baseUrl: !!cleanEnvVar(process.env.NEXT_PUBLIC_BASE_URL),
    databaseUrl: !!process.env.DATABASE_URL,
    stripeSecret: !!cleanEnvVar(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: !!cleanEnvVar(process.env.STRIPE_WEBHOOK_SECRET),
    nodeEnv: process.env.NODE_ENV,
  };

  const allHealthy = Object.entries(checks)
    .filter(([key]) => key !== 'nodeEnv')
    .every(([, value]) => value === true);

  return NextResponse.json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks: {
      ...checks,
      mixpanelClientTokenLength: cleanEnvVar(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)?.length,
      mixpanelServerTokenLength: cleanEnvVar(process.env.MIXPANEL_TOKEN)?.length,
    },
    timestamp: new Date().toISOString(),
  }, { status: allHealthy ? 200 : 500 });
}