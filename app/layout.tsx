import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import { siteUrl } from "@/lib/site";
const title = "Arjun Rawat | AI, Data & Software Engineering";
const description =
  "MSc Artificial Intelligence student at JMU Würzburg building practical ML, data and software systems. Open to Werkstudent opportunities.";
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  authors: [{ name: "Arjun Rawat", url: siteUrl }],
  creator: "Arjun Rawat",
  keywords: [
    "Arjun Rawat",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Engineering",
    "Software Engineering",
    "Werkstudent Würzburg",
    "JMU Würzburg",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Arjun Rawat Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-card.jpg",
        width: 1200,
        height: 630,
        alt: "Arjun Rawat — AI, data and software engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-card.jpg"],
  },
};
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arjun Rawat",
  url: siteUrl,
  image: `${siteUrl}/arjun-professional.webp`,
  jobTitle: "MSc Artificial Intelligence student",
  homeLocation: { "@type": "Place", name: "Würzburg, Germany" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vilnius Gediminas Technical University",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Julius-Maximilians-Universität Würzburg",
  },
  sameAs: [
    "https://github.com/ARJUNRAWAT-DEL",
    "https://www.linkedin.com/in/rwtarjun/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
