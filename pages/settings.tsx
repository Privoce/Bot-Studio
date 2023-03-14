import type { NextPage } from 'next';
import Dashboard from '../layouts/dashboard';
import pkg from '../package.json';

const Home: NextPage = () => (
  <Dashboard>
    <div className="h-13 flex items-center px-4 border-b w-full">header</div>
    <div>Current Version: {pkg.version}</div>
  </Dashboard>
);

export default Home;
