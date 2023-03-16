import { FC } from 'react';
import { PromptMessage } from '../../types/chat';
import TimeCreated from './time-created';

interface Props {
  chatId: string;
  message: PromptMessage;
}

const Index: FC<Props> = ({ chatId, message }) => (
  <div
    id={`${chatId}-${message.id}`}
    className="group flex justify-end items-center pr-4 pl-3 mb-3"
  >
    <TimeCreated
      className="opacity-0 group-hover:opacity-100 px-1.5 text-gray-500 text-xs whitespace-nowrap"
      ms={message.createdAt}
    />
    <div className="flex flex-col items-end">
      <div
        className="border border-theme-500 bg-theme-500 text-white rounded-lg px-2.5 py-[5px] min-w-[32px] min-h-[32px] max-w-[420px]"
        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
      >
        {message.content}
      </div>
    </div>
  </div>
);

export default Index;
