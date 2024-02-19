/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
