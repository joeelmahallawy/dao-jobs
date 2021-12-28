import { extendTheme } from "@chakra-ui/react";

export const theme = {
  colors: {
    PrimaryBlue: "#00A9EE",
    LightBlue: "#F6F9FE",
  },
};

export const Chakratheme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Raleway",
  },
  ...theme,
});
