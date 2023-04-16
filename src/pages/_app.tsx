import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import NextNProgress from "nextjs-progressbar";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <RecoilRoot>
        <ChakraBaseProvider>
          <NextNProgress />
          <Component {...pageProps} />
        </ChakraBaseProvider>
      </RecoilRoot>
    </SessionContextProvider>
  );
}
