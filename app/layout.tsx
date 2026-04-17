import React from "react"
import type { Metadata } from "next";
import { Sniglet } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sniglet = Sniglet({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-sniglet",
});

export const metadata: Metadata = {
  title: "rzyux ",
  description: "Security Research and Writeups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sniglet.className} ${sniglet.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen flex-col items-center">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
