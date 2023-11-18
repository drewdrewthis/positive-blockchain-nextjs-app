/* eslint-disable unused-imports/no-unused-vars */
import type {
  SimplePaletteColorOptions,
  ThemeOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    white: SimplePaletteColorOptions;
  }

  interface PaletteOptions {
    white: SimplePaletteColorOptions;
  }
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

export const muiTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {}),
        }),
      },
    },
  },
};
