import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { OpenaiContextProvider } from '../context/openai';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OpenaiContextProvider>
      <Component {...pageProps} />
    </OpenaiContextProvider>
  );
}

export default MyApp;
