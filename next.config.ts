import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Cover images are usually local (/public/...). If you add an external
    // image URL from the admin dashboard, its host needs to be listed here.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
