'use client';

import { useMixpanel } from '@/lib/use-mixpanel';

export default function MixpanelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useMixpanel();

  return <>{children}</>;
}
