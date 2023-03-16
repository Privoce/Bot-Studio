import { useState } from 'react';

interface Params<B> {
  url: string;
  body: B;
  onmessage?: (event: { data: string }) => void;
}

/**
 * example:
 * const { openai, config } = useOpenai();
 * const { mutateAsync, isLoading } = useOpenaiStream(config?.apiKey);
 * const onSend = async (e: MouseEvent) => {
 *   e.stopPropagation();
 *   await mutateAsync({
 *     url: 'https://api.openai.com/v1/completions',
 *     body: {
 *       model: 'text-davinci-003',
 *       prompt: input,
 *       stream: true,
 *     },
 *     onmessage: (message) => {
 *       if (message === '[DONE]') return;
 *       console.log(message);
 *     },
 *   });
 * };
 * */
export function useOpenaiStream(apiKey?: string) {
  const [isLoading, setIsLoading] = useState(false);
  async function mutateAsync<B = any>({ url, body, onmessage }: Params<B>) {
    try {
      if (!apiKey) return;
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
      if (!reader) return;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read();
        if (done) break;
        const arr = value.split('\n');
        arr.forEach((data) => {
          if (data.length === 0) return; // ignore empty message
          if (data.startsWith(':')) return; // ignore sse comment message
          onmessage?.({ data: data.substring(6) });
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { mutateAsync, isLoading };
}
