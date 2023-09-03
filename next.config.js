/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    },
};

module.exports = nextConfig;
