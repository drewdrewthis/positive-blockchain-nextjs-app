import resolveConfig from "tailwindcss/resolveConfig";
import { SimplePaletteColorOptions, ThemeOptions } from "@mui/material/styles";

import tailwindConfig from "../../tailwind.config.js";


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

const tailwind = resolveConfig(tailwindConfig);

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
