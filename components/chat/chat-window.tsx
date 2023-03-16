import { FC, useState } from 'react';
import { Model } from 'openai';
import { useChatStore } from '../../store/use-chat-store';
import ModelSelector from './model-selector';
import Close8 from '../button/close-7';
import { selectByIds } from '../../utils/entity';
import PromptRequest from './prompt-request';
import { useOpenai } from '../../context/openai';

interface Props {
  chatId: string;
}

const ChatWindow: FC<Props> = ({ chatId }) => {
  const [model, setModel] = useState<Model>();
  const chat = useChatStore((s) => s.chats[chatId]);
  const removeChat = useChatStore((s) => s.removeChat);
  const messages = useChatStore((s) => selectByIds(chat?.messages ?? [], s.messages));
  const { config } = useOpenai();

  if (!chat) return null;
  return (
    <div className="flex-1 min-w-[375px]">
      {chat.pendingPrompts.map((promptId) => (
        <PromptRequest key={promptId} chatId={chatId} promptId={promptId} apiKey={config?.apiKey} />
      ))}
      <div className="sticky top-0 h-13 flex items-center px-2.5 bg-white">
        <ModelSelector value={model} onChange={setModel} />
        <div className="flex-1" />
        <Close8 onClick={() => removeChat(chatId)} />
        <div className="absolute bottom-0 left-0 right-0 border-b" />
      </div>
      <div className="min-h-[calc(100%-52px)] bg-gray-50 text-sm py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className="border rounded-lg mx-4 mb-3 bg-white w-fit px-2 py-1"
            id={`${chat.id}-${m.id}`}
          >
            <div>{m.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
