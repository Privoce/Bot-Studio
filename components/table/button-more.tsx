import { FC, useState, MouseEvent } from 'react';
import { flip, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { OpenAIFile } from 'openai';
import IconMore from '../../assets/material/more_horiz_FILL0_wght400_GRAD0_opsz20.svg';
import MenuItem from '../menu/menu-item';

interface Props {
  file: OpenAIFile;
  onDelete?: (file: OpenAIFile) => void;
}

const Index: FC<Props> = ({ file, onDelete }) => {
  const [visible, setVisible] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: 'bottom',
    middleware: [flip({ fallbackPlacements: ['bottom-end'] })],
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const onClick = (fn?: (file: OpenAIFile) => void) => (e: MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    fn?.(file);
  };

  return (
    <>
      <button
        type="button"
        className="w-5 h-5 rounded hover-theme hover:text-theme-700"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setVisible(!visible)}
      >
        <IconMore className="w-5 h-5" />
      </button>
      {visible && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
          className="z-50 flex flex-col text-sm border rounded-lg overflow-hidden shadow-lg bg-white py-2"
        >
          <MenuItem danger onClick={onClick(onDelete)}>
            Delete file
          </MenuItem>
        </div>
      )}
    </>
  );
};

export default Index;
