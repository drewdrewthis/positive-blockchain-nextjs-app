/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/nextjs-app",
  // Transpile Swagger UI React. https://github.com/swagger-api/swagger-ui/issues/8245
  transpilePackages: [
    "react-syntax-highlighter",
    "swagger-client",
    "swagger-ui-react",
  ],
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
