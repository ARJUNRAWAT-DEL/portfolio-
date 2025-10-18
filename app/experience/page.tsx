"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Experience() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with experience section
    router.replace('/#experience');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Redirecting to Experience section...</p>
      </div>
    </div>
  );
}