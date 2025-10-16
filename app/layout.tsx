import "./globals.css";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SpaceBackground from "../components/SpaceBackground";
import StaticBackground from "../components/StaticBackground";
import ExtensionErrorBoundary from "../components/ExtensionErrorBoundary";
import ClientErrorSuppression from "../components/ClientErrorSuppression";
import HydrationProtection from "../components/HydrationProtection";
import HydrationFix from "../components/HydrationFix";
import ClientOnly from "../components/ClientOnly";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: "Arjun Rawat | Portfolio",
  description: "My professional portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Comprehensive browser extension protection
              (function() {
                try {
                  // Override MutationObserver to prevent extensions from adding attributes
                  const originalMutationObserver = window.MutationObserver;
                  window.MutationObserver = function(callback) {
                    const wrappedCallback = function(mutations) {
                      const filteredMutations = mutations.filter(mutation => {
                        if (mutation.type === 'attributes') {
                          const attrName = mutation.attributeName;
                          if (attrName && (attrName.includes('bis_skin_checked') || 
                              attrName.includes('data-adblock') || 
                              attrName.includes('data-extension'))) {
                            return false;
                          }
                        }
                        return true;
                      });
                      if (filteredMutations.length > 0) {
                        callback.call(this, filteredMutations);
                      }
                    };
                    return new originalMutationObserver(wrappedCallback);
                  };
                  
                  // Prevent extensions from modifying DOM attributes
                  const originalSetAttribute = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, value) {
                    if (name === 'bis_skin_checked' || 
                        name.includes('data-adblock') || 
                        name.includes('data-extension')) {
                      return;
                    }
                    return originalSetAttribute.call(this, name, value);
                  };
                  
                  // More aggressive cleanup for extension attributes
                  const cleanupExtensionAttributes = () => {
                    if (typeof window !== 'undefined') {
                      // Remove extension attributes from all elements
                      const elements = document.querySelectorAll('[bis_skin_checked], [data-adblock], [data-extension]');
                      elements.forEach(el => {
                        el.removeAttribute('bis_skin_checked');
                        el.removeAttribute('data-adblock');
                        el.removeAttribute('data-extension');
                        el.removeAttribute('data-adblock-key');
                        el.removeAttribute('data-extension-id');
                      });
                      
                      // Also check for any attribute starting with specific patterns
                      const allElements = document.querySelectorAll('*');
                      allElements.forEach(el => {
                        Array.from(el.attributes).forEach(attr => {
                          if (attr.name.includes('bis_') || 
                              attr.name.includes('adblock') || 
                              attr.name.includes('extension') ||
                              attr.name.includes('grammarly') ||
                              attr.name.includes('data-lr-')) {
                            el.removeAttribute(attr.name);
                          }
                        });
                      });
                    }
                  };
                  
                  // Run cleanup immediately and then repeatedly
                  cleanupExtensionAttributes();
                  setInterval(cleanupExtensionAttributes, 50);
                  
                  // Protect Geolocation API from extension interference
                  if (typeof navigator !== 'undefined' && navigator.geolocation) {
                    try {
                      // Create a safe backup of the original geolocation object
                      const originalGeolocation = {
                        getCurrentPosition: navigator.geolocation.getCurrentPosition.bind(navigator.geolocation),
                        watchPosition: navigator.geolocation.watchPosition.bind(navigator.geolocation),
                        clearWatch: navigator.geolocation.clearWatch.bind(navigator.geolocation)
                      };
                      
                      // Instead of protecting the original, just ensure errors don't break the app
                      window.addEventListener('error', function(e) {
                        if (e.message.includes('getCurrentPosition') || 
                            e.message.includes('geolocation') ||
                            e.message.includes('read only property')) {
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }
                      });
                      
                      // Also catch unhandled promise rejections
                      window.addEventListener('unhandledrejection', function(e) {
                        if (e.reason && e.reason.message && 
                            (e.reason.message.includes('getCurrentPosition') || 
                             e.reason.message.includes('geolocation'))) {
                          e.preventDefault();
                          return false;
                        }
                      });
                      
                    } catch (e) {
                      // Silently ignore if geolocation protection fails
                    }
                  }
                  
                                    // Suppress extension-related console errors and hydration errors
                  const originalError = console.error;
                  console.error = function(...args) {
                    const message = args.join(' ');
                    if (message.includes('bis_skin_checked') ||
                        message.includes('Hydration failed') ||
                        message.includes('hydration error') ||
                        message.includes('Text content does not match') ||
                        message.includes('server-rendered HTML') ||
                        message.includes('getCurrentPosition') ||
                        message.includes('read only property') ||
                        message.includes('Geolocation') ||
                        message.includes('chrome-extension') ||
                        message.includes('adblock') ||
                        message.includes('extension') ||
                        message.includes('grammarly')) {
                      return; // Suppress these errors
                    }
                    originalError.apply(console, args);
                  };
                  
                  // Also suppress warnings
                  const originalWarn = console.warn;
                  console.warn = function(...args) {
                    const message = args.join(' ');
                    if (message.includes('bis_skin_checked') ||
                        message.includes('Hydration') ||
                        message.includes('getCurrentPosition') ||
                        message.includes('geolocation') ||
                        message.includes('adblock') ||
                        message.includes('extension')) {
                      return; // Suppress these warnings
                    }
                    originalWarn.apply(console, args);
                  };
                } catch (e) {
                  // Silently fail if protection setup fails
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden" suppressHydrationWarning={true}>
        <ExtensionErrorBoundary>
          <ClientErrorSuppression />
          <HydrationProtection />
          <HydrationFix />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <StaticBackground />
            <ClientOnly>
              <SpaceBackground />
            </ClientOnly>
            <div className="relative z-10 flex" suppressHydrationWarning>
              <Sidebar />
              <div className="flex-1 lg:ml-72">
                <main className="min-h-screen p-4 sm:p-6 lg:p-8" suppressHydrationWarning>{children}</main>
                <Footer />
              </div>
            </div>
            <Analytics />
          </ThemeProvider>
        </ExtensionErrorBoundary>
      </body>
    </html>
  );
}
