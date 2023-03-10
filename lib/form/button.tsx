import { DetailedHTMLProps, FC, ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Size } from './types';

interface Props
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'type'
  > {
  size?: Size;
  children?: ReactNode;
  type: 'submit' | 'reset' | 'button';
  variant?: 'text' | 'contained' | 'outlined';
}

const SIZE_STYLE: Record<Size, string> = {
  sm: 'h-6 px-2 text-xs rounded',
  md: 'h-8 px-3 text-sm rounded-md',
  lg: 'h-10 px-4 text-md rounded-lg',
};

const VARIANT_STYLE = {
  text: 'border-none text-gray-900 dark:text-gray-200 bg-transparent',
  contained: 'border-none text-white bg-theme-500',
  outlined: clsx(
    'border border-gray-200 dark:border-gray-700',
    'text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700'
  ),
};

const Index: FC<Props> = ({ size, children, className, variant, type, ...props }) => (
  <button
    /* eslint-disable-next-line react/button-has-type */
    type={type}
    className={clsx(
      SIZE_STYLE[size!],
      VARIANT_STYLE[variant!],
      'text-center focus:outline-none',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

Index.defaultProps = {
  size: 'md',
  variant: 'text',
};

export default Index;
