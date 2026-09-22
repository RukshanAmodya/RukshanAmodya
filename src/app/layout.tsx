import type { Metadata, Viewport } from "next";
import "./globals.css";
import { assetUrl } from "@/lib/assets";

const siteUrl = "https://rukshanamodya.github.io/RukshanAmodya";
const siteTitle = "Rukshan Amodya — Full-Stack Developer & AI Systems Engineer";
const siteDescription =
  "Official portfolio of Rukshan Amodya (amodya.dev). Full-Stack Software Engineer, Flutter & Mobile Specialist, and AI Systems Developer. Founder of Coding Divers & Questra.";
const siteKeywords = [
  "Rukshan Amodya",
  "Rukshan",
  "amodya.dev",
  "Full Stack Developer Sri Lanka",
  "Flutter Developer",
  "Mobile App Developer",
  "AI Systems Engineer",
  "Next.js Developer",
  "React Developer",
  "Python FastAPI Developer",
  "Questra",
  "Coding Divers",
  "Gravix",
  "Software Engineer Portfolio",
  "Sri Lanka Software Engineer",
];

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Rukshan Amodya",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "Rukshan Amodya", url: siteUrl }],
  creator: "Rukshan Amodya",
  publisher: "Rukshan Amodya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: assetUrl("/logo.webp"), type: "image/webp" },
      { url: assetUrl("/favicon.svg"), type: "image/svg+xml" },
    ],
    shortcut: assetUrl("/logo.webp"),
    apple: assetUrl("/logo.webp"),
  },
  manifest: assetUrl("/manifest.json"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Rukshan Amodya Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: siteTitle,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@RukshanAmodya",
    images: [`${siteUrl}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Structured JSON-LD Schema for Google Rich Search Results
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rukshan Amodya",
  alternateName: ["Amodya", "Rukshan", "amodya.dev"],
  url: siteUrl,
  image: `${siteUrl}/logo.webp`,
  jobTitle: "Full-Stack Software Engineer & AI Systems Developer",
  worksFor: [
    {
      "@type": "Organization",
      name: "Coding Divers",
      jobTitle: "Founder",
    },
    {
      "@type": "Organization",
      name: "Questra",
      jobTitle: "Founder",
    },
    {
      "@type": "Organization",
      name: "Gravix",
      jobTitle: "Co-Founder",
    },
  ],
  sameAs: [
    "https://github.com/RukshanAmodya",
    "https://t.me/RukshanAmodya",
    "https://linkedin.com",
    "https://x.com",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "Flutter",
    "Dart",
    "Python",
    "FastAPI",
    "Node.js",
    "AI Agents",
    "Full-Stack Web Engineering",
    "Cloudflare Workers",
    "Cybersecurity",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "SITC Campus",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Moratuwa",
    },
    {
      "@type": "EducationalOrganization",
      name: "iCET Institute",
    },
    {
      "@type": "EducationalOrganization",
      name: "Royal College Horana",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rukshan Amodya Portfolio",
  url: siteUrl,
  description: siteDescription,
  author: {
    "@type": "Person",
    name: "Rukshan Amodya",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href={assetUrl("/logo.webp")} />
        <link rel="apple-touch-icon" href={assetUrl("/logo.webp")} />
        <meta property="og:image" content={`${siteUrl}/og-image.svg`} />
        <meta property="twitter:image" content={`${siteUrl}/og-image.svg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
