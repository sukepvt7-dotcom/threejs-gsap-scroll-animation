import type { Metadata } from "next";
import { Bebas_Neue, Sora } from "next/font/google";

import { SmoothScroll } from "@/components/SmoothScroll";
import { siteConfig } from "@/config/siteConfig";

import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display"
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} | ${siteConfig.brand.tagline}`,
  description: siteConfig.brand.description,
  metadataBase: new URL("https://sokka.vercel.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink text-white antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
