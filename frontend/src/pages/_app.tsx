import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { onErrorHandler } from "@/libs/axios/responseHandler";
import { HeroUIProvider } from "@heroui/system";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHandler(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHandler,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" richColors closeButton />

          <main>
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
