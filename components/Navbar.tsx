// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between px-10 py-5 bg-black/70 backdrop-blur z-50">
      <h1 className="font-bold text-xl">tarun.dev</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
