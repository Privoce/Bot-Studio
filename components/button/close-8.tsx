import { FC, MouseEvent } from 'react';
import clsx from 'clsx';
import IconClose from '../../assets/material/close_FILL0_wght400_GRAD0_opsz24.svg';

interface Props {
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ className, onClick }) => (
  <button
    type="button"
    className={clsx('w-8 h-8 p-1 rounded-md hover-theme hover:text-theme-700', className)}
    onClick={onClick}
  >
    <IconClose className="w-6 h-6" />
  </button>
);

export default Index;
