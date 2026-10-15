import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
