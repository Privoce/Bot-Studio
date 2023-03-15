import { FC, useRef } from 'react';

interface Props {
  accept?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (file: File) => void;
}

const Index: FC<Props> = ({ accept, name, disabled, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
        onClick={() => ref.current?.click()}
      />
      <input
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        disabled={disabled}
        className="hidden w-0 h-0"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onChange?.(file);
          }
          // eslint-disable-next-line no-param-reassign
          e.target.value = '';
        }}
      />
    </>
  );
};

export default Index;
