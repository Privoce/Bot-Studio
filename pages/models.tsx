import type { NextPage } from 'next';
import Dashboard from '../layouts/dashboard';

const Home: NextPage = () => (
  <Dashboard>
    <div className="relative h-13 flex items-center px-4  w-full">
      <div className="absolute bottom-0 left-0 right-0 border-b" />
    </div>
    <div>Landing</div>
  </Dashboard>
);

export default Home;
