import { FC, MouseEvent } from 'react';
import IconRefresh from '../../assets/material/refresh_FILL0_wght400_GRAD0_opsz24.svg';

interface Props {
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ onClick }) => (
  <button
    type="button"
    className="text-theme-500 w-8 h-8 p-1 rounded-md hover-theme hover:text-theme-700"
    onClick={onClick}
  >
    <IconRefresh className="w-6 h-6" />
  </button>
);

export default Index;
