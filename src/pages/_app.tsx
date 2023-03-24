import type { AppProps } from "next/app";
import "@/styles/globals.css";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
