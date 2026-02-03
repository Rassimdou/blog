import React from "react"
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "0xBlog // CTF Writeups & Security Topics",
  description:
    "CTF writeups, pentesting research, and security notes from the underground.",
  generator: "",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.className} font-mono antialiased bg-background text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
