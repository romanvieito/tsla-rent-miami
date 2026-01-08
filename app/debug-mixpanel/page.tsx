'use client';

import { useEffect, useState } from 'react';

export default function DebugMixpanelPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Check environment variables
    const clientToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    const nodeEnv = process.env.NODE_ENV;

    setDebugInfo({
      clientToken: clientToken ? `${clientToken.substring(0, 10)}...` : 'NOT SET',
      nodeEnv,
      clientTokenLength: clientToken?.length,
      isClient: typeof window !== 'undefined',
      windowLocation: typeof window !== 'undefined' ? window.location.href : 'N/A',
      timestamp: new Date().toISOString(),
    });

    // Try to import mixpanel
    try {
      import('mixpanel-browser').then((mixpanel) => {
        setDebugInfo(prev => ({
          ...prev,
          mixpanelImported: true,
          mixpanelVersion: mixpanel?.version || 'unknown'
        }));
      }).catch((error) => {
        setDebugInfo(prev => ({
          ...prev,
          mixpanelImported: false,
          importError: error.message
        }));
      });
    } catch (error) {
      setDebugInfo(prev => ({
        ...prev,
        mixpanelImported: false,
        importError: (error as Error).message
      }));
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Mixpanel Debug Information</h1>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Environment Check</h2>
        <pre className="bg-white p-4 rounded border overflow-x-auto">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            try {
              // Test a simple track call
              const event = { name: 'Debug Test', timestamp: new Date().toISOString() };
              console.log('Manual test event:', event);
              setDebugInfo(prev => ({ ...prev, manualTestTriggered: true, manualTestEvent: event }));
            } catch (error) {
              setDebugInfo(prev => ({ ...prev, manualTestError: (error as Error).message }));
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Trigger Test Event
        </button>
      </div>
    </div>
  );
}