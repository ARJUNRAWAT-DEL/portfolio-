'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const monitorWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime, 'ms');
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              const fidEntry = entry as any; // Type assertion for FID entry
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime, 'ms');
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            const clsEntry = entry as any; // Type assertion for CLS entry
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
            }
          }
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Page Load Performance
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('Performance Metrics:', {
            'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
            'TCP Connection': navigation.connectEnd - navigation.connectStart,
            'Request': navigation.responseStart - navigation.requestStart,
            'Response': navigation.responseEnd - navigation.responseStart,
            'DOM Processing': navigation.domComplete - navigation.domContentLoadedEventStart,
            'Total Load Time': navigation.loadEventEnd - navigation.fetchStart
          });
        }
      });
    };

    // Resource Loading Monitor
    const monitorResources = () => {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resource = entry as PerformanceResourceTiming;
            if (resource.duration > 1000) { // Flag slow resources (>1s)
              console.warn('Slow resource detected:', {
                name: resource.name,
                duration: resource.duration,
                size: resource.transferSize
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
      }
    };

    // Memory Usage Monitor (if available)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('Memory Usage:', {
          'Used JS Heap': `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
          'Total JS Heap': `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
          'Heap Limit': `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
        });
      }
    };

    // Initialize monitoring
    monitorWebVitals();
    monitorResources();
    
    // Monitor memory every 30 seconds
    const memoryInterval = setInterval(monitorMemory, 30000);
    monitorMemory(); // Initial check

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null; // This component doesn't render anything
}