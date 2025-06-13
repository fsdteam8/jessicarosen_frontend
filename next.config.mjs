/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // allow http
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https', // still allow https
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;