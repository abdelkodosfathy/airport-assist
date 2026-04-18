/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
