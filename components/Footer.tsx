import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-24">
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left */}
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Tarun Pal. All rights reserved.
        </p>

        {/* Center */}
        {/* <div className="flex gap-6 text-sm">
          <Link href="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/projects" className="hover:text-blue-400 transition">
            Projects
          </Link>
          <Link href="/experience" className="hover:text-blue-400 transition">
            Experience
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div> */}

        {/* Right */}
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/yourspal"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/tarun-pal-94b2811bb/"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}
