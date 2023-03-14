import { FC, useState, MouseEvent } from 'react';
import { flip, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { FineTune } from 'openai';
import IconMore from '../../assets/material/more_horiz_FILL0_wght400_GRAD0_opsz20.svg';
import MenuItem from '../menu/menu-item';

interface Props {
  fineTune: FineTune;
  onTrainingFiles?: (fineTune: FineTune) => void;
  onValidationFiles?: (fineTune: FineTune) => void;
  onResultFiles?: (fineTune: FineTune) => void;
  onCancel?: (fineTune: FineTune) => void;
}

const Index: FC<Props> = ({
  fineTune,
  onTrainingFiles,
  onValidationFiles,
  onResultFiles,
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: 'bottom',
    middleware: [flip({ fallbackPlacements: ['bottom-end'] })],
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const onClick = (fn?: (fineTune: FineTune) => void) => (e: MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    fn?.(fineTune);
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
          <MenuItem onClick={onClick(onTrainingFiles)}>Training Files</MenuItem>
          <MenuItem onClick={onClick(onValidationFiles)}>Validation Files</MenuItem>
          <MenuItem onClick={onClick(onResultFiles)}>Result Files</MenuItem>
          <MenuItem danger onClick={onClick(onCancel)}>
            Cancel Fine-tune
          </MenuItem>
        </div>
      )}
    </>
  );
};

export default Index;
