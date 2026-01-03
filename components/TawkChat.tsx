'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkChat({ isVisible }: { isVisible: boolean }) {
  const isLoaded = useRef(false);
  const isVisibleRef = useRef(isVisible);

  // Keep ref in sync for callbacks
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  // Sync visibility when prop changes and we know it's loaded
  useEffect(() => {
    if (isLoaded.current && window.Tawk_API) {
      if (isVisible) {
        window.Tawk_API.showWidget();
      } else {
        window.Tawk_API.hideWidget();
      }
    }
  }, [isVisible]);

  // Initial setup
  useEffect(() => {
    if (!window.Tawk_API) {
      window.Tawk_API = {};
    }

    // Function to apply state
    const applyState = () => {
      isLoaded.current = true;
      if (isVisibleRef.current) {
        window.Tawk_API?.showWidget();
      } else {
        window.Tawk_API?.hideWidget();
      }
    };

    // Check if already loaded (methods exist)
    if (typeof window.Tawk_API.showWidget === 'function') {
      applyState();
      return;
    }

    // Otherwise hook into onLoad
    const existingOnLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = function () {
      applyState();
      if (existingOnLoad) existingOnLoad();
    };
  }, []); // Run once on mount

  return (
    <Script id="tawk-chat" strategy="lazyOnload">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6921f49adadafd196019646e/1jama6utb';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}
