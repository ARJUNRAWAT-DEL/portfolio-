import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SpaceBackground from "../components/SpaceBackground";

export const metadata = {
  title: "Arjun Rawat | Portfolio",
  description: "My professional portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-black text-white overflow-x-hidden" suppressHydrationWarning={true}>
        <SpaceBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
