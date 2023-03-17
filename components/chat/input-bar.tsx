import { FC, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import Button from '../../lib/form/button';
import { hasText } from '../../utils/string';
import { useChatStore } from '../../store/use-chat-store';
import { useClientStore } from '../../store/use-client-store';
import Textarea from '../../lib/form/textarea';

interface Props {}

const textareaClassName = clsx(
  'px-2.5 py-1.5 text-sm rounded-md w-full block',
  'min-h-[32px] max-h-[92px] h-8 resize-none overflow-y-auto',
  'ring-1 ring-gray-200 focus:ring-2 focus:ring-theme-500',
  'focus:outline-none'
);

const Index: FC<Props> = () => {
  const [input, setInput] = useState('');
  const addPrompt = useChatStore((s) => s.addPrompt);
  const [isOnComposition, setIsOnComposition] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const isMobile = useClientStore((s) => s.device.isMobile);

  const onSend = () => {
    if (!hasText(input)) return;
    addPrompt({ type: 'prompt', id: uuidv4(), content: input, createdAt: Date.now() });
    setInput('');
  };

  return (
    <div className="relative shrink-0 grow-0 min-h-[52px] flex items-center px-3 py-2.5">
      <div className="absolute top-0 right-0 left-0 border-t" />
      <Textarea
        ref={ref}
        value={input}
        maxLength={4096}
        className={textareaClassName}
        placeholder="Type and press enter"
        onCompositionStart={() => setIsOnComposition(true)}
        onCompositionEnd={() => setIsOnComposition(false)}
        onChange={(e) => setInput(e.target.value)}
        onInput={() => {
          const element = ref.current;
          if (!element) return;
          element.style.height = '32px';
          element.style.height = `${element.scrollHeight}px`; // borderTop + borderBottom = 2px
        }}
        onKeyDown={(e) => {
          // PC and enter only
          if (!isMobile && !e.shiftKey && !isOnComposition && e.key === 'Enter') {
            e.preventDefault();
            onSend();
          }
        }}
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
