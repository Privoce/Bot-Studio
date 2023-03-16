import { FC, MouseEvent } from 'react';
import clsx from 'clsx';
import IconClose from '../../assets/material/close_FILL0_wght400_GRAD0_opsz20.svg';

interface Props {
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ className, onClick }) => (
  <button
    type="button"
    className={clsx('w-7 h-7 p-1 rounded-md hover-theme hover:text-theme-700', className)}
    onClick={onClick}
  >
    <IconClose className="w-5 h-5" />
  </button>
);

export default Index;
