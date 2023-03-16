import type { NextPage } from 'next';
import Dashboard from '../layouts/dashboard';
import ChatWindow from '../components/chat/chat-window';
import { useChatStore } from '../store/use-chat-store';
import ConfigBar from '../components/chat/config-bar';
import InputBar from '../components/chat/input-bar';

const Home: NextPage = () => {
  const list = useChatStore((s) => s.list);

  return (
    <Dashboard>
      <div className="flex h-full">
        <div className="h-full flex-1 flex flex-col">
          <div className="w-[calc(100vw-240px-288px)] overflow-x-auto divide-x grow shrink flex">
            {list.map((chatId) => (
              <ChatWindow key={chatId} chatId={chatId} />
            ))}
          </div>
          <InputBar />
        </div>
        <ConfigBar />
      </div>
    </Dashboard>
  );
};

export default Home;
