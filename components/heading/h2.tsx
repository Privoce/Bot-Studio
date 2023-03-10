import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Index: FC<Props> = ({ children }) => (
  <h2 className="text-xl font-medium mt-6 mb-2">{children}</h2>
);

export default Index;
