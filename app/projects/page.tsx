"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with projects section
    router.replace('/#projects');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Redirecting to Projects section...</p>
      </div>
    </div>
  );
}