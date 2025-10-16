"use client";
import { useEffect } from 'react';

export default function HydrationProtection() {
  useEffect(() => {
    // Additional client-side protection that runs after React hydration
    const protectionScript = () => {
      try {
        // Remove any extension attributes that might have been added after initial load
        const cleanupAttributes = () => {
          const elements = document.querySelectorAll('*');
          elements.forEach(el => {
            // Remove known extension attributes
            if (el.hasAttribute('bis_skin_checked')) {
              el.removeAttribute('bis_skin_checked');
            }
            if (el.hasAttribute('data-adblock-key')) {
              el.removeAttribute('data-adblock-key');
            }
            if (el.hasAttribute('data-extension-id')) {
              el.removeAttribute('data-extension-id');
            }
          });
        };

        // Clean up immediately
        cleanupAttributes();

        // Set up continuous monitoring
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
              const target = mutation.target as Element;
              const attrName = mutation.attributeName;
              
              if (attrName && (
                attrName.includes('bis_skin_checked') ||
                attrName.includes('data-adblock') ||
                attrName.includes('data-extension')
              )) {
                target.removeAttribute(attrName);
              }
            }
          });
        });

        observer.observe(document.body, {
          attributes: true,
          attributeOldValue: true,
          subtree: true,
          attributeFilter: ['bis_skin_checked', 'data-adblock-key', 'data-extension-id']
        });

        // Cleanup function
        return () => {
          observer.disconnect();
        };
      } catch (error) {
        // Silently handle any errors
        console.warn('Hydration protection setup failed:', error);
      }
    };

    const cleanup = protectionScript();
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
}