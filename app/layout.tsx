// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tarun Pal | Full Stack Developer",
    template: "%s | Tarun Pal",
  },
  description:
    "Full Stack Developer specializing in React Native, Next.js, .NET Core, and SQL Server. Building scalable web and mobile applications.",
  keywords: [
    "Full Stack Developer",
    "React Native Developer",
    "Next.js Developer",
    ".NET Core",
    "SQL Server",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Tarun Pal" }],
  creator: "Tarun Pal",
  openGraph: {
    title: "Tarun Pal | Full Stack Developer",
    description:
      "Portfolio of Tarun Pal — Full Stack Developer (React Native, Next.js, .NET Core)",
    url: "https://your-portfolio.vercel.app",
    siteName: "Tarun Pal Portfolio",
    images: [
      {
        url: "/og-image.png", // place this in public/
        width: 1200,
        height: 630,
        alt: "Tarun Pal Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarun Pal | Full Stack Developer",
    description:
      "Full Stack Developer building scalable apps using React Native, Next.js, and .NET Core.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
