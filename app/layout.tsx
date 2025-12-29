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

            // Clean positioning system using CSS custom properties
            function applyBottomOffsetToTawkDom(bottomOffset, rightOffset) {
              // Tawk often sets inline styles with !important. CSS cannot override inline !important,
              // so we also set inline styles (with the "important" priority) on the relevant nodes.
              const bottomValue = 'calc(' + bottomOffset + ' + env(safe-area-inset-bottom))';
              const desiredBottomPx = (function() {
                const n = parseInt(bottomOffset, 10);
                return Number.isFinite(n) ? n : 20;
              })();

              const nodes = Array.from(
                document.querySelectorAll(
                  [
                    // Common Tawk containers/iframes
                    'div.widget-visible',
                    'div.widget-visible iframe',
                    '[id^="tawkchat"]',
                    'iframe[src*="tawk.to"]',
                  ].join(',')
                )
              );

              for (const node of nodes) {
                try {
                  // Keep Tawk pinned to bottom-right, but lifted above sticky UI when needed
                  node.style.setProperty('position', 'fixed', 'important');
                  node.style.setProperty('right', rightOffset, 'important');
                  node.style.setProperty('left', 'auto', 'important');
                  node.style.setProperty('bottom', bottomValue, 'important');
                  node.style.setProperty('top', 'auto', 'important');
                } catch (e) {
                  // Ignore nodes that don't support style mutations
                }
              }

              // Clamp the bottom offset for larger panels so their header/top never gets pushed off-screen.
              // This matters when the chat is expanded and the desired bottom offset is large.
              requestAnimationFrame(function() {
                for (const node of nodes) {
                  try {
                    if (!node.getBoundingClientRect) continue;
                    const rect = node.getBoundingClientRect();
                    const topPadding = 8;
                    const bottomPadding = 8;

                    if (rect.height <= 0) continue;

                    // If the top is cut off, reduce the bottom offset until it fits.
                    if (rect.top < topPadding) {
                      const maxBottom = Math.max(
                        0,
                        Math.floor(window.innerHeight - rect.height - topPadding - bottomPadding)
                      );
                      const clamped = Math.min(desiredBottomPx, maxBottom);
                      node.style.setProperty('bottom', clamped + 'px', 'important');
                      node.style.setProperty('top', 'auto', 'important');
                    }
                  } catch (e) {
                    // Ignore measurement errors
                  }
                }
              });
            }

            function updateTawkPosition() {
              const stickyBarVisible = document.body.getAttribute('data-sticky-bar-visible') === 'true';
              const isMobile = window.innerWidth < 768;
              
              // Calculate bottom offset based on sticky bar visibility
              let bottomOffset = '20px'; // Default position
              let rightOffset = isMobile ? '8px' : '16px';
              
              if (stickyBarVisible) {
                // When sticky bar is visible, position above it (mobile + desktop)
                // Note: safe-area inset is handled in CSS via env(safe-area-inset-bottom)
                bottomOffset = isMobile ? '180px' : '160px';
              }
              
              // Set CSS custom property for positioning
              document.documentElement.style.setProperty('--tawk-bottom-offset', bottomOffset);
              // Also apply inline styles so we override Tawk's inline !important styles reliably
              applyBottomOffsetToTawkDom(bottomOffset, rightOffset);
            }

            // Listen for custom events from the page
            window.addEventListener('sticky-bar-visibility-change', function(event) {
              updateTawkPosition();
            });

            // Watch for Tawk DOM nodes being injected, then apply positioning once they exist.
            (function setupTawkDomObserver() {
              let scheduled = false;
              const schedule = function() {
                if (scheduled) return;
                scheduled = true;
                setTimeout(function() {
                  scheduled = false;
                  updateTawkPosition();
                }, 50);
              };

              try {
                const observer = new MutationObserver(function(mutations) {
                  for (const m of mutations) {
                    if (m.type === 'childList' && (m.addedNodes && m.addedNodes.length)) {
                      schedule();
                      break;
                    }
                  }
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
              } catch (e) {
                // If MutationObserver is unavailable, we still update on load/resize/events.
              }
            })();

            // Listen for resize events
            let resizeTimeout;
            window.addEventListener('resize', function() {
              clearTimeout(resizeTimeout);
              resizeTimeout = setTimeout(updateTawkPosition, 150);
            });

            // Initialize position when Tawk.to loads
            Tawk_API.onLoad = function() {
              updateTawkPosition();
              
              // Use Tawk.to's API to customize widget appearance
              Tawk_API.customStyle = {
                zIndex: 40 // Below sticky bar (z-50) but above content
              };

              // Re-apply positioning when the chat is opened/closed (dimensions change).
              // (These callbacks are supported by Tawk's JS API.)
              Tawk_API.onChatMaximized = function() {
                updateTawkPosition();
              };
              Tawk_API.onChatMinimized = function() {
                updateTawkPosition();
              };
            };

            // Initialize on DOM ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', updateTawkPosition);
            } else {
              updateTawkPosition();
            }
          `}
        </Script>
      </body>
    </html>
  )
}

