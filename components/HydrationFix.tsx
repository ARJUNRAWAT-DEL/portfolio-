"use client";

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Handle runtime errors from extensions
    const handleError = (event: ErrorEvent) => {
      const message = event.message || '';
      if (message.includes('getCurrentPosition') ||
          message.includes('read only property') ||
          message.includes('Geolocation') ||
          message.includes('chrome-extension') ||
          message.includes('extendCurrentPosition') ||
          message.includes('extendLocation')) {
        event.preventDefault();
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

    // Add global error handlers
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

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