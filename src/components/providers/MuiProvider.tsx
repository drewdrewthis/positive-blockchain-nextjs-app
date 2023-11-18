"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider , createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

import { muiTheme } from "../../configuration/mui-theme";

function GlobalCssPriority({ children }: { children: React.ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. Now you can override Material UI's styles. */}
      {children}
    </StyledEngineProvider>
  );
}

const cache = createCache({
  key: "css",
  prepend: true,
});
function PlainCssPriority({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cache}>
      {/* Your component tree. Now you can override Material UI's styles. */}
      {children}
    </CacheProvider>
  );
}

const theme = createTheme(muiTheme);

/**
 * Wrapper to help with MUI and Tailwind CSS interoperability
 * https://mui.com/material-ui/guides/interoperability/#tailwind-css
 */
export function MuiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PlainCssPriority>
      <GlobalCssPriority>
        {/* 
          Creates a styles baseline which resets browser defaults
          https://mui.com/material-ui/react-css-baseline/
         */}
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GlobalCssPriority>
    </PlainCssPriority>
  );
}
