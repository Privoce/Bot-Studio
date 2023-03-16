import { FC, MouseEvent, useRef, useState } from 'react';
import { CreateCompletionRequest, CreateCompletionResponse } from 'openai';
import Input from '../../lib/form/input';
import Button from '../../lib/form/button';
import { useOpenai } from '../../context/openai';
import { useOpenaiStream } from '../../hooks/use-openai-stream';

interface Props {}

const Index: FC<Props> = () => {
  const [input, setInput] = useState('');
  const ref = useRef<string>('');
  const [result, setResult] = useState('');
  const { config } = useOpenai();
  const { mutateAsync, isLoading } = useOpenaiStream(config?.apiKey);
  const onSend = async (e: MouseEvent) => {
    e.stopPropagation();
    await mutateAsync<CreateCompletionRequest>({
      url: 'https://api.openai.com/v1/completions',
      body: {
        model: 'text-davinci-003',
        prompt: input,
        stream: true,
        max_tokens: 64,
        echo: false,
      },
      onmessage: (event) => {
        if (event.data === '[DONE]') return;
        const data = JSON.parse(event.data) as CreateCompletionResponse;
        ref.current += data.choices[0].text;
        setResult(ref.current);
      },
    });
  };

  return (
    <div className="relative shrink-0 grow-0 min-h-[52px] flex items-center px-3">
      <div className="absolute top-0 right-0 left-0 border-t" />
      <Input
        value={input}
        placeholder="Type and press enter"
        className="w-full"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="button"
        variant="contained"
        disabled={isLoading}
        className="ml-3"
        onClick={onSend}
      >
        Send
      </Button>
    </div>
  );
};

export default Index;
