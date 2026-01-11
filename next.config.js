/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Rediriger www vers non-www pour normaliser les URLs
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.thomasfoltzer.com',
          },
        ],
        destination: 'https://thomasfoltzer.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;








