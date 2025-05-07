/** @type {import('next').NextConfig} */
const nextConfig = {
    imagePatterns: [
        {
            // Match any image from the domain example.com
            protocol: 'https',
            hostname: 'res.cloudinary.com',
        },
      
    ],
};

export default nextConfig;
