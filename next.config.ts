import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['ibb.co', 'via.placeholder.com', 'res.cloudinary.com', 'source.unsplash.com'], // add your image hosts here
  },
};

export default nextConfig;
