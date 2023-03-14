import { FC, CSSProperties, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  to: string;
  danger?: boolean;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ to, danger, style, children, onClick }) => (
  <Link
    href={to}
    className={clsx(
      'block text-sm px-4 flex items-center h-8 cursor-pointer whitespace-nowrap',
      danger
        ? 'text-red-500 hover:text-red-700 hover-danger'
        : 'text-color-primary hover-theme hover:text-theme-700'
    )}
    style={style}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Index;
