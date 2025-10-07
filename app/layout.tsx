import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Arjun Rawat | Portfolio",
  description: "My professional portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gradient-to-b from-gray-900 to-black text-white" suppressHydrationWarning={true}>
        <Navbar />
        <main className="min-h-screen pt-20 px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
