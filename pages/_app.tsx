import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, Hydrate, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { useState } from 'react';
import { OpenaiContextProvider } from '../context/openai';

function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
}

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <OpenaiContextProvider>
          <Component {...pageProps} />
        </OpenaiContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
