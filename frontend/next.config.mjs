/** @type {import('next').NextConfig} */

const BACKEND_PORT = process.env.BACKEND_PORT || 3001;

const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3001/api/:path*',
          },
        ]
      },
};

export default nextConfig;
