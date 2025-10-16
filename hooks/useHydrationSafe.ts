"use client";
import { useEffect, useState } from 'react';

/**
 * Hook to safely handle hydration mismatches by ensuring component renders only on client
 */
export function useHydrationSafe() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely get current pathname without hydration issues
 */
export function useSafePathname() {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  return pathname;
}