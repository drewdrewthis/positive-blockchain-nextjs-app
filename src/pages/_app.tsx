import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { CacheProvider } from "@emotion/react";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Open_Sans } from "next/font/google";
import { DefaultSeo } from "next-seo";

import createEmotionCache from "../lib/createEmotionCache";
import defaultConfig from "../next-seo.config";

// If loading a variable font, you don't need to specify the font weight
const openSans = Open_Sans({ subsets: ["latin"] });
const clientSideEmotionCache = createEmotionCache();
const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
    allVariants: {
      fontFamily: openSans.style.fontFamily,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={clientSideEmotionCache}>
        <style jsx global>{`
          html {
            font-family: ${openSans.style.fontFamily};
          }
        `}</style>
        <ThemeProvider theme={theme}>
          <DefaultSeo {...defaultConfig} />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}
