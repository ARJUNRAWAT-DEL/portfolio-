import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import StaticBackground from "../components/StaticBackground";
import ExtensionErrorBoundary from "../components/ExtensionErrorBoundary";
import ClientErrorSuppression from "../components/ClientErrorSuppression";
import HydrationProtection from "../components/HydrationProtection";
import HydrationFix from "../components/HydrationFix";
import ClientOnly from "../components/ClientOnly";
import ArjunAI from "../components/ArjunAI";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: "Arjun Rawat | Full Stack Developer & Software Engineer",
  description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my portfolio of innovative projects and technical expertise.",
  keywords: ["Arjun Rawat", "Full Stack Developer", "React Developer", "Next.js", "JavaScript", "TypeScript", "Web Development", "Software Engineer", "Portfolio"],
  authors: [{ name: "Arjun Rawat" }],
  robots: "index, follow",
  openGraph: {
    title: "Arjun Rawat | Full Stack Developer & Software Engineer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
    siteName: "Arjun Rawat Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arjun Rawat - Full Stack Developer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Rawat | Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.resend.com" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
        
        {/* Viewport and responsive meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance hints */}
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        
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
                      // ULTRA protection against getCurrentPosition modification
                      const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;
                      Object.defineProperty(navigator.geolocation, 'getCurrentPosition', {
                        value: originalGetCurrentPosition,
                        writable: false,
                        configurable: false
                      });
                      
                      // Block any property assignment to geolocation
                      Object.defineProperty(navigator, 'geolocation', {
                        value: navigator.geolocation,
                        writable: false,
                        configurable: false
                      });
                      
                      Object.freeze(navigator.geolocation);
                      Object.freeze(navigator.geolocation.getCurrentPosition);
                      Object.freeze(navigator.geolocation.watchPosition);
                      Object.freeze(navigator.geolocation.clearWatch);
                    } catch (e) {
                      // Silent fail - extension protection
                    }
                  }
                  
                  // Block ALL property assignments that include 'extendCurrentPosition'
                  const originalDefineProperty = Object.defineProperty;
                  Object.defineProperty = function(target, property, descriptor) {
                    if (typeof property === 'string' && 
                        (property.includes('extendCurrentPosition') || 
                         property.includes('extendLocation') ||
                         property === 'getCurrentPosition')) {
                      return target; // Block the property definition
                    }
                    return originalDefineProperty.call(this, target, property, descriptor);
                  };
                  
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
            <ClientOnly>
              <Navbar />
            </ClientOnly>
            <div className="relative z-10 flex" suppressHydrationWarning>
              <ClientOnly>
                <ArjunAI />
              </ClientOnly>
              <div className="flex-1">
                <main className="min-h-screen p-4 sm:p-6 lg:p-8 pt-20" suppressHydrationWarning>{children}</main>
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
