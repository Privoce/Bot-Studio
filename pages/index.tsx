import type { NextPage } from 'next';
import { useState } from 'react';
import Dashboard from '../layouts/dashboard';

const Home: NextPage = () => {
  const [value, setValue] = useState('');
  return (
    <Dashboard>
      <div className="h-full flex flex-col">
        <div className="flex-1">windows</div>
        <div className="relative shrink-0 grow-0 min-h-[52px] flex items-center px-4">
          <div className="absolute top-0 right-0 left-0 border-t" />
          <input
            value={value}
            placeholder="Type and press enter"
            onChange={(e) => setValue(e.target.value)}
            className="focus:outline-none border h-8 rounded-full w-full px-3 text-sm"
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
