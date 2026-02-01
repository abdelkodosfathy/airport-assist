import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "airportassist-backend.aqaralex.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
