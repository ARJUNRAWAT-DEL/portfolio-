"use client";
import { useEffect } from 'react';

export function useExtensionErrorSuppression() {
  useEffect(() => {
    // Suppress browser extension errors
    const originalError = window.addEventListener;
    const originalUnhandledRejection = window.addEventListener;

    // Override error event listener
    window.addEventListener = function(type: string, listener: any, options?: any) {
      if (type === 'error') {
        const wrappedListener = (event: Event) => {
          const errorEvent = event as ErrorEvent;
          // Filter out extension errors
          if (errorEvent.error?.stack?.includes('chrome-extension://') ||
              errorEvent.error?.message?.includes('getCurrentPosition') ||
              errorEvent.error?.message?.includes('read only property') ||
              errorEvent.filename?.includes('chrome-extension://')) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          return listener(event);
        };
        return originalError.call(this, type, wrappedListener, options);
      }
      return originalError.call(this, type, listener, options);
    };

    // Handle unhandled promise rejections from extensions
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (typeof reason === 'string' && 
          (reason.includes('chrome-extension://') ||
           reason.includes('getCurrentPosition') ||
           reason.includes('read only property'))) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Override console.error to filter extension errors
    const originalConsoleError = console.error;
    console.error = function(...args: any[]) {
      const message = args.join(' ');
      if (message.includes('chrome-extension://') ||
          message.includes('getCurrentPosition') ||
          message.includes('read only property') ||
          message.includes('eppiocemhmnlbhjplcgkofciiegomcon')) {
        return; // Suppress extension errors
      }
      originalConsoleError.apply(console, args);
    };

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      console.error = originalConsoleError;
    };
  }, []);
}

export default useExtensionErrorSuppression;