"use client";

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Handle runtime errors from extensions - NUCLEAR OPTION
    const handleError = (event: ErrorEvent) => {
      const message = event.message || '';
      const filename = event.filename || '';
      
      // Block ALL extension-related errors
      if (message.includes('getCurrentPosition') ||
          message.includes('read only property') ||
          message.includes('Geolocation') ||
          message.includes('chrome-extension') ||
          message.includes('extendCurrentPosition') ||
          message.includes('extendLocation') ||
          message.includes('TypeError') ||
          message.includes('assign') ||
          filename.includes('chrome-extension') ||
          filename.includes('location.js') ||
          filename.includes('eppiocemhmnlbhjplcgkofciiegomcon')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (reason && reason.message) {
        const message = reason.message;
        if (message.includes('getCurrentPosition') ||
            message.includes('read only property') ||
            message.includes('Geolocation') ||
            message.includes('chrome-extension')) {
          event.preventDefault();
          return false;
        }
      }
    };

    // Add global error handlers with highest priority
    window.addEventListener('error', handleError, { capture: true, passive: false });
    window.addEventListener('unhandledrejection', handleUnhandledRejection, { capture: true, passive: false });
    
    // Additional DOM error blocking
    document.addEventListener('error', handleError, { capture: true, passive: false });
    
    // Block specific extension errors at the source
    const originalThrow = Error.prototype.constructor;
    Error.prototype.constructor = function(message: any) {
      if (typeof message === 'string' && 
          (message.includes('getCurrentPosition') || 
           message.includes('read only property') ||
           message.includes('extendCurrentPosition'))) {
        // Return a harmless error
        return { message: '', stack: '', name: 'BlockedError' };
      }
      return originalThrow.call(this, message);
    };

    // Remove all problematic attributes after hydration
    const cleanup = () => {
      const problematicAttributes = [
        'bis_skin_checked',
        'data-adblock-key',
        'data-extension-id',
        'data-adblock',
        'data-extension'
      ];

      problematicAttributes.forEach(attr => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach(el => el.removeAttribute(attr));
      });
    };

    // Run cleanup multiple times to catch all extension modifications
    cleanup();
    const interval = setInterval(cleanup, 10);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}