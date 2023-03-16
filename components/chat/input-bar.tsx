import { FC, MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../lib/form/input';
import Button from '../../lib/form/button';
import { hasText } from '../../utils/string';
import { useChatStore } from '../../store/use-chat-store';

interface Props {}

const Index: FC<Props> = () => {
  const [input, setInput] = useState('');
  const addPrompt = useChatStore((s) => s.addPrompt);
  const onSend = async (e: MouseEvent) => {
    e.stopPropagation();
    addPrompt({ type: 'prompt', id: uuidv4(), content: input });
    setInput('');
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
        className="ml-3"
        disabled={!hasText(input)}
        onClick={onSend}
      >
        Send
      </Button>
    </div>
  );
};

export default Index;
