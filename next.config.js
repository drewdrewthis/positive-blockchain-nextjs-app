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
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        // Apply these headers to all routes in your application.
        source: "/api/project-data",
        headers: [
          {
            key: "Referrer-Policy",
            // Allow all access
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
