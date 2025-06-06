import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextNProgress from "nextjs-progressbar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <NextNProgress
          color="#4299e1"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
