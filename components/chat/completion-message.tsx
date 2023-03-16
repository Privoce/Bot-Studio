import { FC } from 'react';
import { CompletionMessage } from '../../types/chat';

interface Props {
  chatId: string;
  message: CompletionMessage;
}

const Index: FC<Props> = ({ chatId, message }) => (
  <div
    id={`${chatId}-${message.id}`}
    className="group relative flex justify-start items-center pl-4 pr-3 mb-3"
  >
    <div className="flex flex-col items-start">
      <div
        className="border bg-white text-color-primary rounded-lg px-2.5 py-[5px] min-w-[32px] min-h-[32px] max-w-[420px]"
        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
      >
        {message.content}
      </div>
    </div>
    <div className="text-color-secondary text-xs pl-1.5 min-w-[56px]">
      <span className="opacity-0 group-hover:opacity-100">{Math.round(message.duration)}ms</span>
    </div>
  </div>
);

export default Index;
