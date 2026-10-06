import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  primaryColor: "green",
  defaultRadius: "md",
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}