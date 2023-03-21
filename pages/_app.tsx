import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, Hydrate, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import UAParser from 'ua-parser-js';
import { OpenaiContextProvider } from '../context/openai';
import Gtag from '../components/track/gtag';
import { useClientStore } from '../store/use-client-store';
import Bridger from '../components/track/bridger';

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
  const updateDevice = useClientStore((s) => s.updateDevice);
  useEffect(() => {
    const ua = new UAParser();
    updateDevice({
      isMobile: ua.getDevice().type === 'mobile',
      isSafari: (ua.getBrowser().name ?? '').toLowerCase().includes('safari'),
      isFirefox: (ua.getBrowser().name ?? '').toLowerCase().includes('firefox'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Gtag tagId="G-3CFLVWPL2J" />
      <Bridger />
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
