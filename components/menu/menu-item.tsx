import { FC, CSSProperties, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  danger?: boolean;
  style?: CSSProperties;
  children: ReactNode;
  testid?: string;
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ danger, style, children, testid, onClick }) => (
  <button
    type="button"
    data-testid={testid}
    className={clsx(
      'w-full text-sm px-4 flex items-center h-8 cursor-pointer whitespace-nowrap',
      danger
        ? 'text-red-500 hover:text-red-700 hover-danger'
        : 'text-color-primary hover-theme hover:text-theme-700'
    )}
    style={style}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Index;
