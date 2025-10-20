'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try again
          </button>
          <div className="mt-4">
            <a 
              href="/"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Return to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}