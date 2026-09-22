import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rukshan Amodya | Full-Stack Developer & Gen AI Enthusiast",
  description:
    "Portfolio of Rukshan Amodya - Full-Stack Developer and Gen AI Enthusiast building modern web applications, digital products, and innovative solutions.",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
