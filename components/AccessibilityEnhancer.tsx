'use client';

import { useEffect, useState } from 'react';

export default function AccessibilityEnhancer() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check for user preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');

    // Set initial states based on system preferences
    setReduceMotion(prefersReducedMotion.matches);
    setHighContrast(prefersHighContrast.matches);

    // Listen for changes in system preferences
    const handleDarkChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
      document.documentElement.classList.toggle('high-contrast', e.matches);
    };

    prefersDark.addEventListener('change', handleDarkChange);
    prefersReducedMotion.addEventListener('change', handleMotionChange);
    prefersHighContrast.addEventListener('change', handleContrastChange);

    // Apply initial classes
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
    document.documentElement.classList.toggle('high-contrast', prefersHighContrast.matches);

    // Keyboard navigation enhancement
    const handleKeydown = (e: KeyboardEvent) => {
      // Skip to main content with Alt+M
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Toggle high contrast with Alt+C
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        setHighContrast(prev => {
          const newValue = !prev;
          document.documentElement.classList.toggle('high-contrast', newValue);
          localStorage.setItem('high-contrast', newValue.toString());
          return newValue;
        });
      }

      // Increase font size with Alt+Plus
      if (e.altKey && e.key === '=') {
        e.preventDefault();
        setFontSize(prev => {
          const sizes = ['normal', 'large', 'extra-large'];
          const currentIndex = sizes.indexOf(prev);
          const newSize = sizes[Math.min(currentIndex + 1, sizes.length - 1)];
          document.documentElement.className = document.documentElement.className.replace(/font-size-\w+/g, '');
          document.documentElement.classList.add(`font-size-${newSize}`);
          localStorage.setItem('font-size', newSize);
          return newSize;
        });
      }

      // Decrease font size with Alt+Minus
      if (e.altKey && e.key === '-') {
        e.preventDefault();
        setFontSize(prev => {
          const sizes = ['normal', 'large', 'extra-large'];
          const currentIndex = sizes.indexOf(prev);
          const newSize = sizes[Math.max(currentIndex - 1, 0)];
          document.documentElement.className = document.documentElement.className.replace(/font-size-\w+/g, '');
          document.documentElement.classList.add(`font-size-${newSize}`);
          localStorage.setItem('font-size', newSize);
          return newSize;
        });
      }
    };

    document.addEventListener('keydown', handleKeydown);

    // Focus management for better keyboard navigation
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        target.classList.add('keyboard-focused');
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove('keyboard-focused');
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    // Load saved preferences
    const savedHighContrast = localStorage.getItem('high-contrast') === 'true';
    const savedFontSize = localStorage.getItem('font-size') || 'normal';

    if (savedHighContrast) {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }

    if (savedFontSize !== 'normal') {
      setFontSize(savedFontSize);
      document.documentElement.classList.add(`font-size-${savedFontSize}`);
    }

    // Cleanup
    return () => {
      prefersDark.removeEventListener('change', handleDarkChange);
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
      prefersHighContrast.removeEventListener('change', handleContrastChange);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  // Render accessibility controls (hidden by default, shown on focus)
  return (
    <div className="sr-only focus-within:not-sr-only fixed top-0 left-0 z-50 bg-white dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-600 rounded-br-lg">
      <h2 className="text-lg font-semibold mb-2">Accessibility Controls</h2>
      <div className="space-y-2">
        <button
          onClick={() => {
            setHighContrast(prev => {
              const newValue = !prev;
              document.documentElement.classList.toggle('high-contrast', newValue);
              localStorage.setItem('high-contrast', newValue.toString());
              return newValue;
            });
          }}
          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {highContrast ? 'Disable' : 'Enable'} High Contrast (Alt+C)
        </button>
        
        <button
          onClick={() => {
            setReduceMotion(prev => {
              const newValue = !prev;
              document.documentElement.classList.toggle('reduce-motion', newValue);
              localStorage.setItem('reduce-motion', newValue.toString());
              return newValue;
            });
          }}
          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {reduceMotion ? 'Enable' : 'Disable'} Animations
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFontSize(prev => {
                const sizes = ['normal', 'large', 'extra-large'];
                const currentIndex = sizes.indexOf(prev);
                const newSize = sizes[Math.min(currentIndex + 1, sizes.length - 1)];
                document.documentElement.className = document.documentElement.className.replace(/font-size-\w+/g, '');
                document.documentElement.classList.add(`font-size-${newSize}`);
                localStorage.setItem('font-size', newSize);
                return newSize;
              });
            }}
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            A+ (Alt+=)
          </button>
          <button
            onClick={() => {
              setFontSize(prev => {
                const sizes = ['normal', 'large', 'extra-large'];
                const currentIndex = sizes.indexOf(prev);
                const newSize = sizes[Math.max(currentIndex - 1, 0)];
                document.documentElement.className = document.documentElement.className.replace(/font-size-\w+/g, '');
                document.documentElement.classList.add(`font-size-${newSize}`);
                localStorage.setItem('font-size', newSize);
                return newSize;
              });
            }}
            className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            A- (Alt+-)
          </button>
        </div>
        
        <button
          onClick={() => {
            const main = document.querySelector('main');
            if (main) {
              main.focus();
              main.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Skip to Main Content (Alt+M)
        </button>
      </div>
    </div>
  );
}