import type { NextPage } from 'next';
import Dashboard from '../layouts/dashboard';
import pkg from '../package.json';
import H2 from '../components/heading/h2';

const Home: NextPage = () => (
  <Dashboard>
    <div className="px-4 sm:px-6">
      <H2>Settings</H2>
      <div>Current Version: {pkg.version}</div>
    </div>
  </Dashboard>
);

export default Home;
