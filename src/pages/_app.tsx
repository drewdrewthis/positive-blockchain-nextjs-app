import type { AppProps } from "next/app";

import "@/styles/globals.css";

import { DefaultSeo } from "next-seo";

import { GoogleFontWrapper } from "../components/providers/GoogleFontWrapper";
import { MuiWrapper } from "../components/providers/MuiProvider";
import defaultConfig from "../next-seo.config";

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
