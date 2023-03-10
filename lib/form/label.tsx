import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Index: FC<Props> = ({ children }) => (
  <div className="text-sm text-color-secondary pb-2">{children}</div>
);

export default Index;
