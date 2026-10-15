import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Assistant from "@/components/Assistant";
import CommandPalette from "@/components/CommandPalette";
import ScrollFx from "@/components/ScrollFx";
import { profile } from "@/lib/profile";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description =
  "Tarun Pal - full-stack engineer (.NET Core, React, React Native, SQL Server) building telecom and fintech products. Auth, payments, and APIs that hold up.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} - Full-stack engineer`, template: `%s - ${profile.name}` },
  description,
  keywords: [".NET Core", "React", "React Native", "SQL Server", "Full stack engineer", "Stripe", "Noida"],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title: `${profile.name} - Full-stack engineer`,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: "profile",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} - Full-stack engineer`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c14" },
  ],
};

const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;document.documentElement.dataset.js=""}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <div className="relative z-10">{children}</div>
        <Assistant />
        <CommandPalette />
        <ScrollFx />
      </body>
    </html>
  );
}
