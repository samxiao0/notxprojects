import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOTX — The Academic Engineering Studio",
  description: "Bespoke university capstone engineering, IEEE 40+ page manuscripts, guaranteed AnyDesk live runs, and 30+ viva defense oral exam preparation.",
  keywords: [
    "academic projects",
    "computer science projects",
    "IEEE projects",
    "capstone projects",
    "engineering studio",
    "viva defense",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white text-slate-900 scroll-smooth">
      <body className="min-h-full flex flex-col bg-white antialiased selection:bg-[#CCFF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
