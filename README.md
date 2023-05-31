# Positive Blockchain Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Usage of .env.example

The `.env.example` file serves as a template for configuring your environment variables in the Next.js project. This section explains how to use the `.env.example` file to set up your environment variables.

#### Copying the File

1. Duplicate the `.env.example` file and rename it to `.env`. This will create a new file where you can store your actual environment variable values.

   **Note:** The `.env` file should not be committed to version control as it contains sensitive information. Make sure to keep it secure and only share it with trusted collaborators or deployment environments.

#### Setting Environment Variables

1. Open the `.env` file in a text editor.

2. For each environment variable listed in the `.env.example` file, provide the appropriate value after the equal sign (`=`). Remove the placeholders and replace them with your actual values.

   For example:

   ```plaintext
   GOOGLE_API_KEY=your-google-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   REDIS_HOST=your-redis-host
   ```

   Replace `your-google-api-key`, `your-google-client-id`, and `your-redis-host` with your respective values.

3. Save the `.env` file.

#### Updating Environment Variables

If you need to update or add new environment variables after initially setting up the `.env` file, follow these steps:

1. Open the `.env` file in a text editor.

2. Update the existing environment variables or add new ones following the same syntax:

   ```plaintext
   VARIABLE_NAME=new-value
   ```

3. Save the `.env` file with the updated values.

#### Using Environment Variables in the Project

To use the environment variables in your Next.js project, you can access them using `process.env.VARIABLE_NAME`, where `VARIABLE_NAME` corresponds to the name of the environment variable.

For example, to access the `GOOGLE_API_KEY` environment variable:

```javascript
const googleApiKey = process.env.GOOGLE_API_KEY;
// Use the `googleApiKey` value in your code
```

Remember to restart your local development server or rebuild your project for the changes in the environment variables to take effect.

#### Important Note

Ensure that the `.env` file is included in the `.gitignore` file to prevent it from being committed to version control and exposed publicly. It's important to protect sensitive information such as API keys and credentials.

For more information on environment variables in Next.js, refer to the official documentation: [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).

Make sure to secure your environment variables and follow best practices for handling sensitive information in your development and deployment processes.

### Running the project locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## [Testing](./DOCS/TESTING.md)

## [Contributing](./DOCS/CONTRIBUTING.md)

## [Deploying](./DOCS/DEPLOYING.md)

## [Caching](./DOCS/CACHING.md)
