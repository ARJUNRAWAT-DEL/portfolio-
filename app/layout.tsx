import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SpaceBackground from "../components/SpaceBackground";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: "Arjun Rawat | Portfolio",
  description: "My professional portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden" suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SpaceBackground />
          <div className="relative z-10 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72">
              <main className="min-h-screen p-4 sm:p-6 lg:p-8">{children}</main>
              <Footer />
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
