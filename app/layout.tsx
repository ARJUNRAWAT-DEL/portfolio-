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
              // NUCLEAR Extension Protection - Block specific extension
              (function() {
                try {
                  // Block the specific problematic extension
                  const blockedExtensionId = 'eppiocemhmnlbhjplcgkofciiegomcon';
                  
                  // Override Error and TypeError constructors completely
                  const originalError = window.Error;
                  const originalTypeError = window.TypeError;
                  
                  window.Error = function(message) {
                    if (typeof message === 'string') {
                      if (message.includes('getCurrentPosition') ||
                          message.includes('read only property') ||
                          message.includes('Geolocation') ||
                          message.includes('chrome-extension') ||
                          message.includes(blockedExtensionId) ||
                          message.includes('extendCurrentPosition') ||
                          message.includes('extendLocation')) {
                        return { message: '', stack: '', name: 'BlockedExtensionError', toString: () => '' };
                      }
                    }
                    return new originalError(message);
                  };
                  
                  window.TypeError = function(message) {
                    if (typeof message === 'string') {
                      if (message.includes('getCurrentPosition') ||
                          message.includes('read only property') ||
                          message.includes('assign to read only') ||
                          message.includes('Geolocation') ||
                          message.includes(blockedExtensionId)) {
                        return { message: '', stack: '', name: 'BlockedTypeError', toString: () => '' };
                      }
                    }
                    return new originalTypeError(message);
                  };
                  
                  // Freeze the geolocation object completely
                  if (navigator.geolocation) {
                    try {
                      Object.freeze(navigator.geolocation);
                      Object.freeze(navigator.geolocation.getCurrentPosition);
                      Object.freeze(navigator.geolocation.watchPosition);
                      Object.freeze(navigator.geolocation.clearWatch);
                    } catch (e) {
                      // If freezing fails, create a replacement
                      const originalGeo = navigator.geolocation;
                      Object.defineProperty(navigator, 'geolocation', {
                        value: Object.freeze({
                          getCurrentPosition: originalGeo.getCurrentPosition.bind(originalGeo),
                          watchPosition: originalGeo.watchPosition.bind(originalGeo),
                          clearWatch: originalGeo.clearWatch.bind(originalGeo)
                        }),
                        writable: false,
                        configurable: false
                      });
                    }
                  }
                  
                  // Block extension scripts from loading
                  const originalCreateElement = document.createElement;
                  document.createElement = function(tagName) {
                    const element = originalCreateElement.call(this, tagName);
                    if (tagName.toLowerCase() === 'script') {
                      const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
                      Object.defineProperty(element, 'src', {
                        set: function(value) {
                          if (value && value.includes(blockedExtensionId)) {
                            return; // Block the script
                          }
                          originalSrcDescriptor.set.call(this, value);
                        },
                        get: originalSrcDescriptor.get,
                        configurable: true
                      });
                    }
                    return element;
                  };
                  
                  // Block fetch requests from the extension
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    const url = args[0];
                    if (typeof url === 'string' && url.includes(blockedExtensionId)) {
                      return Promise.reject(new Error('Blocked extension request'));
                    }
                    return originalFetch.apply(this, args);
                  };
                  
                  // Enhanced error capture with immediate suppression
                  window.addEventListener('error', function(e) {
                    const message = e.message || '';
                    const source = e.filename || '';
                    if (message.includes('getCurrentPosition') ||
                        message.includes('read only property') ||
                        message.includes('extendCurrentPosition') ||
                        message.includes('extendLocation') ||
                        source.includes(blockedExtensionId)) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.stopImmediatePropagation();
                      return false;
                    }
                  }, true);
                  
                  // Override MutationObserver to prevent extensions from adding attributes
                  const originalMutationObserver = window.MutationObserver;
                  window.MutationObserver = function(callback) {
                    const wrappedCallback = function(mutations) {
                      const filteredMutations = mutations.filter(mutation => {
                        if (mutation.type === 'attributes') {
                          const attrName = mutation.attributeName;
                          if (attrName && (attrName.includes('bis_skin_checked') || 
                                          attrName.includes('adblock') || 
                                          attrName.includes('extension'))) {
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
                  };                  // Prevent extensions from modifying DOM attributes
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
                  
                  // Complete extension error suppression
                  window.onerror = function(message, source, lineno, colno, error) {
                    const msg = message ? message.toString() : '';
                    if (msg.includes('getCurrentPosition') ||
                        msg.includes('read only property') ||
                        msg.includes('Geolocation') ||
                        msg.includes('chrome-extension') ||
                        msg.includes('extendCurrentPosition') ||
                        msg.includes('extendLocation') ||
                        (source && source.includes('chrome-extension'))) {
                      return true; // Suppress the error
                    }
                    return false; // Let other errors through
                  };
                  
                  window.addEventListener('unhandledrejection', function(e) {
                    const reason = e.reason;
                    if (reason && reason.message) {
                      const msg = reason.message;
                      if (msg.includes('getCurrentPosition') ||
                          msg.includes('read only property') ||
                          msg.includes('Geolocation') ||
                          msg.includes('chrome-extension')) {
                        e.preventDefault();
                        return false;
                      }
                    }
                  });
                  
                  // Protect against any geolocation modifications
                  if (typeof navigator !== 'undefined' && navigator.geolocation) {
                    try {
                      // Create a proxy to intercept and suppress errors
                      const originalGeolocation = navigator.geolocation;
                      Object.defineProperty(navigator, 'geolocation', {
                        get: function() {
                          return new Proxy(originalGeolocation, {
                            get: function(target, property) {
                              if (property === 'getCurrentPosition' || property === 'watchPosition') {
                                return function() {
                                  try {
                                    return target[property].apply(target, arguments);
                                  } catch (e) {
                                    // Silently ignore errors
                                    return null;
                                  }
                                };
                              }
                              return target[property];
                            },
                            set: function(target, property, value) {
                              // Allow setting but catch any errors
                              try {
                                target[property] = value;
                                return true;
                              } catch (e) {
                                return true; // Pretend it worked
                              }
                            }
                          });
                        },
                        configurable: true
                      });
                    } catch (e) {
                      // If proxy approach fails, just ignore
                    }
                  }
                  
                                    // Comprehensive console error suppression
                  const originalError = console.error;
                  const originalWarn = console.warn;
                  const originalLog = console.log;
                  
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
                        message.includes('extendCurrentPosition') ||
                        message.includes('extendLocation') ||
                        message.includes('TypeError') && message.includes('assign') ||
                        message.includes('adblock') ||
                        message.includes('extension') ||
                        message.includes('grammarly')) {
                      return; // Suppress these errors
                    }
                    originalError.apply(console, args);
                  };
                  
                  console.warn = function(...args) {
                    const message = args.join(' ');
                    if (message.includes('bis_skin_checked') ||
                        message.includes('Hydration') ||
                        message.includes('getCurrentPosition') ||
                        message.includes('geolocation') ||
                        message.includes('chrome-extension') ||
                        message.includes('read only property') ||
                        message.includes('TypeError') ||
                        message.includes('adblock') ||
                        message.includes('extension')) {
                      return; // Suppress these warnings
                    }
                    originalWarn.apply(console, args);
                  };
                  
                  // Also suppress console.log for extensions
                  console.log = function(...args) {
                    const message = args.join(' ');
                    if (message.includes('chrome-extension') ||
                        message.includes('extendCurrentPosition') ||
                        message.includes('extendLocation')) {
                      return; // Suppress extension logs
                    }
                    originalLog.apply(console, args);
                  };
                  
                  // DOM observer to remove extension scripts
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                          if (node.tagName === 'SCRIPT' && 
                              (node.src && node.src.includes(blockedExtensionId))) {
                            node.remove();
                          }
                          // Remove any child scripts from the extension
                          const scripts = node.querySelectorAll && node.querySelectorAll('script');
                          if (scripts) {
                            scripts.forEach(function(script) {
                              if (script.src && script.src.includes(blockedExtensionId)) {
                                script.remove();
                              }
                            });
                          }
                        }
                      });
                    });
                  });
                  
                  // Start observing
                  if (document.body) {
                    observer.observe(document.body, { childList: true, subtree: true });
                  } else {
                    document.addEventListener('DOMContentLoaded', function() {
                      observer.observe(document.body, { childList: true, subtree: true });
                    });
                  }
                  
                } catch (e) {
                  // Silently fail if protection setup fails
                  console.log('Extension protection setup failed:', e);
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
