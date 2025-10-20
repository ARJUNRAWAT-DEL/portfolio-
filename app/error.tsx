'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          We encountered an unexpected error. This has been logged and we'll look into it.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg transition-all hover:from-cyan-600 hover:to-purple-700"
          >
            Try again
          </button>
          <a 
            href="/"
            className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Go home
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
              Error Details (Development only)
            </summary>
            <pre className="mt-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded overflow-auto">
              {error.message}
              {error.stack && `\n\nStack trace:\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}