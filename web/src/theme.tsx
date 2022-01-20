import { createTheme, responsiveFontSizes } from "@mui/material/styles";


declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    bold: true;
  }
}


let theme = createTheme({
  typography: {
    fontFamily: ['"Manrope"', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "bold" },
          style: {
            fontWeight: "bold",
            border: `.25em solid black`,
            color: "black",
            backgroundColor: "#79A9F5"
          }
        }
      ],
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;