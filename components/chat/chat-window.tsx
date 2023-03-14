import { FC, useState } from 'react';
import { Model } from 'openai';
import { useChatStore } from '../../store/use-chat-store';
import ModelSelector from './model-selector';

const ChatWindow: FC = () => {
  const [model, setModel] = useState<Model>();
  useChatStore();
  return (
    <div className="flex-1">
      <div className="relative h-13 flex items-center px-2">
        <ModelSelector value={model} onChange={setModel} />
        <div className="absolute bottom-0 left-0 right-0 border-b" />
      </div>
    </div>
  );
};

export default ChatWindow;
