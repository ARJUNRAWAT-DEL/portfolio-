import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "Arjun Rawat | AI & Data Engineering",
  description:
    "MSc Artificial Intelligence student at JMU Würzburg. Explore my AI, data and software projects. Open to Werkstudent opportunities.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Arjun Rawat | AI & Data Engineering",
    description:
      "Turning data into useful, intelligent software. MSc AI at JMU Würzburg.",
    type: "website",
  },
  twitter: { card: "summary", title: "Arjun Rawat | AI & Data Engineering" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
