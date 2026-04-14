'use client';

import { useEffect } from 'react';
import { routing } from '@/i18n/routing';

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`./${routing.defaultLocale}/`);
  }, []);

  return (
    <noscript>
      <meta httpEquiv="refresh" content={`0; url=./${routing.defaultLocale}/`} />
    </noscript>
  );
}
