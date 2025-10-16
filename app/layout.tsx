import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SpaceBackground from "../components/SpaceBackground";
import ExtensionErrorBoundary from "../components/ExtensionErrorBoundary";
import ClientErrorSuppression from "../components/ClientErrorSuppression";
import HydrationProtection from "../components/HydrationProtection";
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
                  
                  // Clean up extension attributes more aggressively
                  function cleanupExtensionAttributes() {
                    try {
                      const elements = document.querySelectorAll('[bis_skin_checked], [data-adblock], [data-extension]');
                      elements.forEach(el => {
                        el.removeAttribute('bis_skin_checked');
                        el.removeAttribute('data-adblock');
                        el.removeAttribute('data-extension');
                      });
                    } catch (e) {}
                  }
                  
                  // Run cleanup more frequently and on multiple events
                  if (typeof document !== 'undefined') {
                    document.addEventListener('DOMContentLoaded', cleanupExtensionAttributes);
                    document.addEventListener('load', cleanupExtensionAttributes);
                    setInterval(cleanupExtensionAttributes, 100);
                  }
                  
                  // Protect Geolocation API from extension interference
                  if (typeof navigator !== 'undefined' && navigator.geolocation) {
                    // Store original methods safely without making them read-only
                    try {
                      const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition.bind(navigator.geolocation);
                      const originalWatchPosition = navigator.geolocation.watchPosition.bind(navigator.geolocation);
                      
                      // Wrapper functions that ignore extension modifications
                      navigator.geolocation.getCurrentPosition = function(success, error, options) {
                        return originalGetCurrentPosition(success, error, options);
                      };
                      
                      navigator.geolocation.watchPosition = function(success, error, options) {
                        return originalWatchPosition(success, error, options);
                      };
                    } catch (e) {
                      // Silently ignore if geolocation protection fails
                    }
                  }
                  
                  // Suppress extension-related console errors
                  const originalError = console.error;
                  console.error = function(...args) {
                    const message = args.join(' ');
                    if (message.includes('chrome-extension://') || 
                        message.includes('getCurrentPosition') ||
                        message.includes('read only property') ||
                        message.includes('bis_skin_checked')) {
                      return;
                    }
                    originalError.apply(console, args);
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
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SpaceBackground />
            <div className="relative z-10 flex">
              <Sidebar />
              <div className="flex-1 lg:ml-72">
                <main className="min-h-screen p-4 sm:p-6 lg:p-8">{children}</main>
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
