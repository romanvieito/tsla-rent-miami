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
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6921f49adadafd196019646e/1jama6utb';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();

            // TODO: Aggressive function to reposition Tawk.to iframe
            function repositionTawkIframe() {
              // Target the first iframe inside div.widget-visible
              const widgetVisible = document.querySelector('div.widget-visible');
              if (widgetVisible) {
                const iframe = widgetVisible.querySelector('iframe');
                if (iframe) {
                  // Use setProperty with 'important' flag to override inline !important styles
                  iframe.style.setProperty('position', 'fixed', 'important');
                  iframe.style.setProperty('left', 'auto', 'important');
                  iframe.style.setProperty('right', '5px', 'important');
                  iframe.style.setProperty('bottom', '130px', 'important');
                  iframe.style.setProperty('top', 'auto', 'important');
                  return true; // Successfully repositioned
                }
              }
              return false; // Not found yet
            }

            // Continuously check and reposition the iframe
            let repositionInterval;
            function startRepositioning() {
              // Try immediately
              if (repositionTawkIframe()) {
                // If successful, set up a monitor to keep it in place
                repositionInterval = setInterval(function() {
                  repositionTawkIframe();
                }, 500); // Check every 500ms
              } else {
                // If not found, check again after a short delay
                setTimeout(startRepositioning, 200);
              }
            }

            // Use MutationObserver to watch for when the iframe is added/changed
            function setupMutationObserver() {
              const observer = new MutationObserver(function(mutations) {
                if (repositionTawkIframe()) {
                  if (!repositionInterval) {
                    repositionInterval = setInterval(function() {
                      repositionTawkIframe();
                    }, 500);
                  }
                }
              });

              observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
              });
            }

            // Start when Tawk.to loads
            Tawk_API.onLoad = function() {
              startRepositioning();
              setupMutationObserver();
            };

            // Also start immediately and on DOM ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() {
                startRepositioning();
                setupMutationObserver();
              });
            } else {
              startRepositioning();
              setupMutationObserver();
            }
          `}
        </Script>
      </body>
    </html>
  )
}

