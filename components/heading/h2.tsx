import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Index: FC<Props> = ({ children, className }) => (
  <h2 className={clsx('text-2xl font-medium mt-6 mb-2', className)}>{children}</h2>
);

export default Index;
