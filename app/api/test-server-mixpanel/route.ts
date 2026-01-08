import { NextResponse } from 'next/server';
import { trackServerEvent } from '@/lib/mixpanel-server';

export async function GET() {
  try {
    console.log('Testing server-side Mixpanel tracking...');

    // Test a simple server-side event
    trackServerEvent('Test Server Event', {
      test: true,
      timestamp: new Date().toISOString(),
      source: 'test-endpoint'
    });

    console.log('Server-side Mixpanel test completed');

    return NextResponse.json({
      success: true,
      message: 'Server-side Mixpanel test completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Server-side Mixpanel test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}