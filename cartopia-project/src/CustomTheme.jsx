import { createTheme } from "@mui/material/styles";

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#323031",
    },
    secondary: {
      main: "#323031",
    },
    success: {
      main: "#92ed1c",
    },
    fail: {
      main: "#ed571c",
    },
    signIn: {
      main: "#edb31c",
    },
    textPrimary: {
      main: "#ffffff",
    },
    background: {
      default: "#FEFEFE",
    },
  },
});

export default CustomTheme;
