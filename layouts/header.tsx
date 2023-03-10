import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Index: FC<Props> = ({ children }) => (
  <header className="sticky top-0 h-13 flex items-center px-4 w-full bg-white">
    {children}
    <div className="absolute bottom-0 left-0 right-0 border-b" />
  </header>
);

export default Index;
