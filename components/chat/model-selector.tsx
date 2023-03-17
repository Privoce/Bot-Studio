import { FC, useState, MouseEvent, useMemo } from 'react';
import { autoUpdate, flip, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { Model } from 'openai';
import { useOpenai } from '../../context/openai';
import { useModelStore } from '../../store/use-model-store';
import IconExpandLess from '../../assets/material/expand_less_FILL0_wght400_GRAD0_opsz20.svg';
import IconExpandMore from '../../assets/material/expand_more_FILL0_wght400_GRAD0_opsz20.svg';

const official = ['openai', 'openai-dev', 'openai-internal', 'system'];

function getSuffix(id: string) {
  const s = id.split(':');
  if (s.length !== 3) return '';
  // -2023-03-08-16-20-39 = 20 chars
  return s[2].substring(0, s[2].length - 20);
}

const Option: FC<{ model: Model }> = ({ model }) => {
  if (official.includes(model.owned_by)) {
    return <div className="text-sm truncate h-7 leading-[28px]">{model.id}</div>;
  }

  return (
    <div className="text-sm truncate h-7 leading-[28px]">
      {model.id.split(':')[0]}:<span className="">{getSuffix(model.id)}</span>
    </div>
  );
};

interface OptionsProps {
  name: string;
  models: Model[];
  defaultExpanded?: boolean;
  onSelect: (value: Model) => void;
}

const Options: FC<OptionsProps> = ({ name, models, defaultExpanded = false, onSelect }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <>
      <button
        type="button"
        className="flex items-center text-left font-medium w-full text-sm h-7 px-2 hover-theme"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 pr-3">{name}</div>
        {expanded ? <IconExpandLess /> : <IconExpandMore />}
      </button>
      {expanded && (
        <>
          {models.map((m) => (
            <button
              type="button"
              key={m.id}
              className="text-color-secondary w-full text-left px-2 hover-theme"
              onClick={() => onSelect(m)}
            >
              <Option model={m} />
            </button>
          ))}
        </>
      )}
      {expanded && models.length === 0 && (
        <div className="px-2 h-7 leading-[28x] text-color-secondary">No data</div>
      )}
    </>
  );
};

interface Props {
  value?: Model;
  onChange?: (value: Model) => void;
}

const Index: FC<Props> = ({ value, onChange }) => {
  const { openai } = useOpenai();
  const [visible, setVisible] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: 'bottom-start',
    middleware: [flip({ fallbackPlacements: ['top-start'], padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const models = useModelStore((s) => s.models);
  const setModels = useModelStore((s) => s.setModels);
  const { mutate } = useMutation(openai.listModels, { onSuccess: (res) => setModels(res.data) });

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    setVisible(!visible);
    mutate();
  };

  const options = useMemo(
    () => ({
      myModels: models
        .filter((m) => !official.includes(m.owned_by))
        .sort((a, b) => a.created - b.created),
      openai: models.filter((m) => m.owned_by === 'openai').sort((a, b) => a.created - b.created),
      openaiDev: models
        .filter((m) => m.owned_by === 'openai-dev')
        .sort((a, b) => a.created - b.created),
      openaiInternal: models
        .filter((m) => m.owned_by === 'openai-internal')
        .sort((a, b) => a.created - b.created),
      system: models.filter((m) => m.owned_by === 'system').sort((a, b) => a.created - b.created),
    }),
    [models]
  );

  const onSelect = (selected: Model) => {
    setVisible(false);
    onChange?.(selected);
  };

  return (
    <>
      <button
        type="button"
        className={clsx(
          'relative text-left text-sm px-2.5 rounded-lg hover-theme max-w-[320px]',
          'ring-1 ring-gray-200 focus:ring-2 focus:ring-theme-500',
          visible && 'bg-hover-theme'
        )}
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={onClick}
      >
        {value ? (
          <Option model={value} />
        ) : (
          <div className="h-7 leading-[28px] text-color-secondary">Select a model</div>
        )}
      </button>
      {visible && (
        <div
          className="z-50 bg-white shadow-2xl border mt-1.5 rounded-lg overflow-hidden py-1.5 w-[280px] max-h-[480px] overflow-y-auto"
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
        >
          <Options name="My Models" models={options.myModels} defaultExpanded onSelect={onSelect} />
          <Options name="OpenAI" models={options.openai} onSelect={onSelect} />
          <Options name="OpenAI Dev" models={options.openaiDev} onSelect={onSelect} />
          <Options name="OpenAI Internal" models={options.openai} onSelect={onSelect} />
          <Options name="System" models={options.openai} onSelect={onSelect} />
        </div>
      )}
    </>
  );
};

export default Index;
