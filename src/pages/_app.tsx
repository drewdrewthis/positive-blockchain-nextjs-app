import type { AppProps } from "next/app";

import "@/styles/globals.css";
<<<<<<< HEAD
import { CacheProvider } from "@emotion/react";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Open_Sans } from "next/font/google";
=======
>>>>>>> 0caf539 (Finalize custom submission form for submitting)
import { DefaultSeo } from "next-seo";

import createEmotionCache from "../lib/createEmotionCache";
import defaultConfig from "../next-seo.config";
import { MuiWrapper } from "../components/providers/MuiProvider";
import { GoogleFontWrapper } from "../components/providers/GoogleFontWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleFontWrapper>
      <MuiWrapper>
        <DefaultSeo {...defaultConfig} />
        <Component {...pageProps} />
      </MuiWrapper>
    </GoogleFontWrapper>
  );
}
