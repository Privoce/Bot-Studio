import type { NextPage } from 'next';
import Dashboard from '../layouts/dashboard';

const Home: NextPage = () => (
  <Dashboard>
    <div className="h-13 flex items-center px-4 border-b w-full">header</div>
    <div>Landing</div>
  </Dashboard>
);

export default Home;
