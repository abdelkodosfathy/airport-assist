/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mcpServer: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "airportassist-backend.aqaralex.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
