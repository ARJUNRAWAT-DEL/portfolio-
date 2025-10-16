"use client";
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ExtensionErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if error is from browser extension or geolocation
    if (error.message.includes('chrome-extension://') ||
        error.message.includes('getCurrentPosition') ||
        error.message.includes('read only property') ||
        error.message.includes('Geolocation') ||
        error.message.includes('extendCurrentPosition') ||
        error.message.includes('extendLocation') ||
        error.stack?.includes('chrome-extension://') ||
        error.stack?.includes('location.js')) {
      return { hasError: false }; // Ignore extension/geolocation errors
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log only non-extension errors
    if (!error.message.includes('chrome-extension://') &&
        !error.message.includes('getCurrentPosition') &&
        !error.message.includes('read only property') &&
        !error.message.includes('Geolocation') &&
        !error.message.includes('extendCurrentPosition') &&
        !error.message.includes('extendLocation')) {
      console.error('Application error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong
            </h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ExtensionErrorBoundary;