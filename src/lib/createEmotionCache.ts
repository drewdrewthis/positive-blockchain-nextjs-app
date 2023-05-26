import createCache from "@emotion/cache";

/**
 * Creates an Emotion cache instance for managing CSS styles.
 * See https://mui.com/material-ui/guides/server-rendering/ for more information.
 * @returns The Emotion cache instance.
 */
export default function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
