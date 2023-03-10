import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  selected?: boolean;
  children?: ReactNode;
  onSelect?: () => void;
}

const Index: FC<Props> = ({ selected, children, onSelect }) => (
  <button
    type="button"
    className={clsx(
      'flex-1 h-8 flex items-center rounded-md px-2.5',
      selected ? 'border border-theme-500 bg-theme-500/10' : 'border-primary'
    )}
    onClick={onSelect}
  >
    <div
      className={clsx(
        'rounded-full border-2 h-4 w-4 flex items-center justify-center',
        selected ? 'border-theme-500' : 'border-gray-200'
      )}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-theme-500" />}
    </div>
    <div className="pl-2 text-sm text-color-primary">{children}</div>
  </button>
);

export default Index;
