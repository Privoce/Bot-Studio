import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Index: FC<Props> = ({ children, className }) => (
  <h3 className={clsx('text-xl font-medium mt-6 mb-2', className)}>{children}</h3>
);

export default Index;
