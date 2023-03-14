import type { NextPage } from 'next';
import { useState } from 'react';
import Dashboard from '../layouts/dashboard';
import Button from '../lib/form/button';
import ChatWindow from '../components/chat/chat-window';
import { useChatStore } from '../store/use-chat-store';

const Home: NextPage = () => {
  const [value, setValue] = useState('');

  useChatStore();
  return (
    <Dashboard>
      <div className="flex h-full">
        <div className="h-full flex-1 flex flex-col justify-start">
          <div className="flex grow shrink overflow-x-auto divide-x">
            <ChatWindow />
            <ChatWindow />
            <ChatWindow />
          </div>
          <div className="relative shrink-0 grow-0 min-h-[52px] flex items-center px-3">
            <div className="absolute top-0 right-0 left-0 border-t" />
            <input
              value={value}
              placeholder="Type and press enter"
              onChange={(e) => setValue(e.target.value)}
              className="focus:outline-none border h-8 rounded-lg w-full px-2.5 text-sm"
            />
          </div>
        </div>
        <div className="relative h-full w-60">
          <div className="absolute left-0 top-0 bottom-0 border-l" />
          <div className="p-4">
            <Button type="button" variant="contained" className="w-full">
              Add Compare Window
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
