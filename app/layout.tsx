import type { Metadata } from 'next'
import 'react-day-picker/dist/style.css'
import './globals.css'
import MixpanelProvider from '@/components/MixpanelProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'TSLA Rent Miami',
  description: 'A Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DX977ZP8FS"
        />
        <Script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DX977ZP8FS');gtag('config','AW-16510475658');`,
          }}
        />
      </head>
      <body>
        <MixpanelProvider>
          {children}
        </MixpanelProvider>
        <Script id="tawk-to-chat" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            // Official API: only zIndex is documented for customStyle
            // Docs: https://developer.tawk.to/jsapi/#customStyle
            Tawk_API.customStyle = {
              zIndex: 1000  // Above other content, below sticky booking bar
            };

            // Position widget at top-right using CSS (works with Tawk's iframe structure)
            function positionTawkWidget() {
              const widgetSelectors = [
                'div.widget-visible',
                'div.widget-visible iframe',
                '[id^="tawkchat"]',
                'iframe[src*="tawk.to"]'
              ];

              widgetSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                  // Position at top-right with safe margins
                  element.style.position = 'fixed';
                  element.style.top = '10px';
                  element.style.right = '20px';
                  element.style.left = 'auto';
                  element.style.bottom = 'auto';
                  element.style.zIndex = '1000';
                });
              });
            }

            // Wait for Tawk to load, then apply positioning
            Tawk_API.onLoad = function() {
              // Initial positioning
              setTimeout(positionTawkWidget, 100);

              // Re-apply positioning when chat state changes
              Tawk_API.onChatMaximized = positionTawkWidget;
              Tawk_API.onChatMinimized = positionTawkWidget;

              // Watch for DOM changes (Tawk sometimes re-injects elements)
              const observer = new MutationObserver(function(mutations) {
                let needsUpdate = false;
                mutations.forEach(mutation => {
                  if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    needsUpdate = true;
                  }
                });
                if (needsUpdate) {
                  setTimeout(positionTawkWidget, 100);
                }
              });
              observer.observe(document.body, { childList: true, subtree: true });
            };

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
      </body>
    </html>
  )
}

