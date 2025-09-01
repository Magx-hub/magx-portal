/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    assetPrefix: isProd ? '/NextJS-Tailwind-App-Presentation-Page/' : '',
    basePath: isProd ? '/NextJS-Tailwind-App-Presentation-Page' : '',
    output: 'export',
    images: {
      unoptimized: true, // Disable default image optimization
    },
};

module.exports = nextConfig;
