import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import CelestialSunPass from "@/components/CelestialSunPass";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <ThemeProvider>
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta property="og:title" content="Title-name" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="..." />
            <meta property="og:image" content="File-path" />
            <meta property="og:url" content="Canonical-url" />
          </Head>
          <CelestialSunPass />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default App;
