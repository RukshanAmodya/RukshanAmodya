import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thejan GO | Full-Stack Developer & Gen AI Enthusiast",
  description:
    "Founder of CodexSL and Co-Founder of elix.lk, building Telegram bots, mini apps, and modern web solutions.",
  icons: {
    icon: "/favicon.svg",
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
