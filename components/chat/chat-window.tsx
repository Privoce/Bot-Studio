import { FC, useState } from 'react';
import { Model } from 'openai';
import { useChatStore } from '../../store/use-chat-store';
import ModelSelector from './model-selector';
import Close8 from '../button/close-7';

interface Props {
  chatId: string;
}

const ChatWindow: FC<Props> = ({ chatId }) => {
  const [model, setModel] = useState<Model>();
  const chat = useChatStore((s) => s.chats[chatId]);
  const removeChat = useChatStore((s) => s.removeChat);

  if (!chat) return null;
  return (
    <div className="flex-1 min-w-[375px]">
      <div className="relative h-13 flex items-center px-2.5">
        <ModelSelector value={model} onChange={setModel} />
        <div className="flex-1" />
        <Close8 onClick={() => removeChat(chatId)} />
        <div className="absolute bottom-0 left-0 right-0 border-b" />
      </div>
    </div>
  );
};

export default ChatWindow;
