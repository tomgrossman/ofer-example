/** @type {import('next').NextConfig} */

const BACKEND_PORT = 3001;

const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `http://localhost:${BACKEND_PORT}/api/:path*`,
          },
        ]
      },
};

export default nextConfig;
