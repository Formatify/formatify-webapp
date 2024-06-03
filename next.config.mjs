/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    env: {
        NEXTAUTH_URL: isProd ? 'https://formatify.onrender.com/' : 'http://localhost:3000/',
    },
    images: {
        domains: ['images.unsplash.com'],
    },
};

export default nextConfig;
