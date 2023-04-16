import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "./../chakra/theme";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </ChakraBaseProvider>
  );
}
