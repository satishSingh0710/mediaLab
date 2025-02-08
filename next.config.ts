import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: false,
  }, 
  images: {
    domains: ["img.clerk.com","res.cloudinary.com"], // ✅ Allow Clerk profile images
  },
};

export default nextConfig;

