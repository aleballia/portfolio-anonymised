import type { Metadata } from "next";
import { Inter, Rock_Salt } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { rootMetadata } from "../config/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  variable: "--font-rock-salt",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 100% privacy-first analytics */}
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="afterInteractive" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${rockSalt.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
