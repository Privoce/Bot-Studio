import { FC, MouseEvent } from 'react';
import copy from 'copy-to-clipboard';
import IconCopy from '../../assets/material/content_copy_FILL0_wght400_GRAD0_opsz20.svg';

interface Props {
  copyText: string;
}

const Index: FC<Props> = ({ copyText }) => {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    copy(copyText);
  };

  return (
    <button
      type="button"
      className="w-5 h-5 rounded-md hover-theme hover:text-theme-700"
      onClick={onClick}
    >
      <IconCopy className="w-5 h-5" />
    </button>
  );
};

export default Index;
