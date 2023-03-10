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
    >
      <input
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        disabled={disabled}
        style={{
          width: '0',
          height: '0',
          opacity: '0',
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,
        }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onChange?.(file);
          }
          // eslint-disable-next-line no-param-reassign
          e.target.value = '';
        }}
      />
    </button>
  );
};

export default Index;
