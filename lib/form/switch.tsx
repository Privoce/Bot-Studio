import { FC } from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { Size } from './types';

interface Props {
  size?: Size;
  checked?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const OUTER_SIZE_STYLE: Record<Size, string> = {
  sm: 'h-3 w-[22px] border',
  md: 'h-4 w-7 border-2',
  lg: 'h-6 w-11 border-2',
};

const INNER_SIZE_STYLE: Record<Size, string> = {
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
  lg: 'h-5 w-5',
};

const INNER_CHECKED_STYLE: Record<Size, string> = {
  sm: 'translate-x-2.5',
  md: 'translate-x-3',
  lg: 'translate-x-5',
};

const Index: FC<Props> = ({ size = 'md', checked, className, onChange }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    className={clsx(
      OUTER_SIZE_STYLE[size],
      checked ? 'bg-theme-500' : 'bg-gray-100 dark:bg-gray-700',
      'relative flex shrink-0 grow-0',
      'transition-colors ease-in-out duration-200',
      'border-transparent rounded-full cursor-pointer focus:outline-none',
      'focus:ring-2 focus:ring-theme-500 focus:ring-opacity-50',
      className
    )}
  >
    <span
      aria-hidden="true"
      className={clsx(
        INNER_SIZE_STYLE[size],
        checked ? INNER_CHECKED_STYLE[size] : 'translate-x-0',
        'transition ease-in-out duration-200',
        'pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0'
      )}
    />
  </Switch>
);

export default Index;
