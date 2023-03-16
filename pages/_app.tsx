import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, Hydrate, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { OpenaiContextProvider } from '../context/openai';
import Gtag from '../components/track/gtag';

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
}

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(createQueryClient);

  return (
    <>
      <Gtag tagId="G-3CFLVWPL2J" />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <OpenaiContextProvider>
            <Component {...pageProps} />
          </OpenaiContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
