import { FC, useEffect, useRef, useState } from 'react';
import { useChatStore } from '../../store/use-chat-store';
import ModelSelector from './model-selector';
import Close8 from '../button/close-7';
import { selectByIds } from '../../utils/entity';
import PromptRequest from './prompt-request';
import { useOpenai } from '../../context/openai';
import PromptMessage from './prompt-message';
import CompletionMessage from './completion-message';

interface Props {
  chatId: string;
}

const ChatWindow: FC<Props> = ({ chatId }) => {
  const chat = useChatStore((s) => s.chats[chatId]);
  const removeChat = useChatStore((s) => s.removeChat);
  const updateModel = useChatStore((s) => s.updateModel);
  const messages = useChatStore((s) => selectByIds(chat?.messages ?? [], s.messages));
  const { config } = useOpenai();
  const ref = useRef<HTMLDivElement>(null);

  // add scroll listener and set lock status
  const [scrollLocked, setScrollLocked] = useState(false);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const onScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = container;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      setScrollLocked(scrollBottom > 320);
    };
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scroll to bottom when new message coming
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (scrollLocked) return;
    window.setTimeout(() => {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (!chat) return null;
  return (
    <div className="flex-1 min-w-[340px] overflow-y-auto" ref={ref}>
      {chat.pendingPrompts.map((promptId) => (
        <PromptRequest key={promptId} chatId={chatId} promptId={promptId} apiKey={config?.apiKey} />
      ))}
      <div className="z-10 sticky top-0 h-13 flex items-center px-2.5 bg-white">
        <ModelSelector value={chat.model} onChange={(m) => updateModel(chatId, m)} />
        <div className="flex-1" />
        <Close8 onClick={() => removeChat(chatId)} />
        <div className="absolute bottom-0 left-0 right-0 border-b" />
      </div>
      <div className="min-h-[calc(100%-52px)] bg-gray-50 text-sm py-3">
        {messages.map((m) =>
          m.type === 'prompt' ? (
            <PromptMessage key={m.id} chatId={chatId} message={m} />
          ) : (
            <CompletionMessage key={m.id} chatId={chatId} message={m} />
          )
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
