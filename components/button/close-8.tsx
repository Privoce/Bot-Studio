import { FC, MouseEvent } from 'react';
import IconClose from '../../assets/material/close_FILL0_wght400_GRAD0_opsz24.svg';

interface Props {
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ onClick }) => (
  <button type="button" className="w-8 h-8 p-1 rounded-md hover-gray" onClick={onClick}>
    <IconClose className="w-6 h-6" />
  </button>
);

export default Index;
