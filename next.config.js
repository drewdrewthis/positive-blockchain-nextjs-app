/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/nextjs-app",
  images: {
    domains: ["positiveblockchain.io", "images.squarespace-cdn.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        basePath: false,
        destination: "/nextjs-app/projects",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
