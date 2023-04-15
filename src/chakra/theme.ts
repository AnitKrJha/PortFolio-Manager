import { extendTheme } from "@chakra-ui/react";
import { ButtonStyle } from "./button";

//Colors

//components
const components = {
  Button: ButtonStyle,
};

export const theme = extendTheme({ components });
