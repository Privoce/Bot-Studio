import { FC, ReactNode } from 'react';
import Nav from './nav';
import { ToastContainer } from '../lib/toast';

interface Props {
  children?: ReactNode;
}

const Index: FC<Props> = ({ children }) => (
  <div className="h-full w-full flex text-color-primary">
    <Nav />
    <main className="h-full shrink grow overflow-y-auto">{children}</main>
    <ToastContainer />
  </div>
);

export default Index;
