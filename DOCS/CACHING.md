# Caching Documentation

This documentation provides an overview of the caching mechanisms implemented in our NextJS project, along with details on how caching is used for API calls, page renders, and data retrieval from the Google Sheets API. The project utilizes Vercel's caching for both API and page renders, incorporating the `stale-while-revalidate` strategy. Additionally, the npm package `memory-cache` is employed to cache calls made to the Google Sheets API in the `src/lib/google/sheets.ts` file.

## Vercel Caching

Docs:

- https://vercel.com/docs/concepts/edge-network/caching
- https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching

[Vercel](https://vercel.com/) offers an edge network caching system that optimizes the performance of our NextJS project. By default, Vercel caches both API responses and page renders for a period of time. This reduces the need to process requests for frequently accessed content, resulting in faster response times and improved scalability.

### Caching Strategy: `stale-while-revalidate`

To ensure a balance between performance and freshness of data, we have implemented the `stale-while-revalidate` caching strategy. This approach allows Vercel to serve cached responses immediately while simultaneously validating the cached content in the background. If an API call or page render request is made during this validation process, Vercel serves the stale (cached) content instead of waiting for the revalidation to complete.

This strategy enables us to provide a seamless user experience by minimizing the impact of validation delays on response times. Users continue to receive quick responses from the cache, while the cache is simultaneously updated with fresh data in the background.

### Configuration and Constants

To control the caching behavior, we utilize a configuration file located at `/src/configuration.ts`. This file contains constants that define caching-related values such as cache duration (TTL). It is crucial to review and update these constants whenever adjustments to the caching behavior are required.

## Caching Google Sheets API Calls

In our project, we rely on the Google Sheets API to pull data from our database. To optimize performance and reduce unnecessary API calls, we employ the `memory-cache` npm package to cache the results of these calls in the `src/lib/google/sheets.ts` file.

### Using `memory-cache`

Docs: https://www.npmjs.com/package/memory-cache

The `memory-cache` package provides a simple and efficient in-memory caching solution. It allows us to store the responses of Google Sheets API calls in memory for a configurable period of time, reducing the need to repeatedly fetch data from the API. By caching the API responses, we can improve the overall responsiveness of our application.

To use `memory-cache`, we import it into our `src/lib/google/sheets.ts` file and employ the caching methods provided by the package. These methods enable us to store and retrieve API responses using custom cache keys and expiration times.

**Example Usage:**

```javascript
import cache from "memory-cache";

const fetchDataFromGoogleSheets = async () => {
  const cacheKey = "uniqueCacheKey";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    // Return cached data
    return cachedData;
  } else {
    // Fetch data from the Google Sheets API
    const data = await fetchGoogleSheetsData();

    // Cache the fetched data for a specific duration
    cache.put(cacheKey, data, durationInMilliseconds);

    return data;
  }
};
```

Make sure to adjust the cache key and duration according to the specific needs of your application.

## Conclusion

By leveraging Vercel's caching capabilities and the `memory-cache` package, we have implemented an efficient caching strategy for our NextJS project. The `stale-while-revalidate` approach ensures quick responses to API and page render requests while ensuring data freshness. Additionally, the use of `memory-cache`
