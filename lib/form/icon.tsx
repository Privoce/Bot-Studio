import { ChangeEvent, FC, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';

interface Props {
  value: string;
  accept?: string;
  disabled?: boolean;
  placeholder?: string;
  request: (file: File) => Promise<string>;
  onChange?: (value: string) => void;
}

const Index: FC<Props> = ({
  value,
  disabled,
  request,
  placeholder = 'Upload',
  accept = 'image/png,image/jpeg,image/bmp',
  onChange,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate, isLoading } = useMutation(request, { onSuccess: onChange });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutate(file);
    }
    // eslint-disable-next-line no-param-reassign
    e.target.value = '';
  };

  return (
    <div
      className={clsx(
        'relative w-[114px] h-[114px] border-primary rounded-lg grow-0 shrink-0',
        value === '' ? 'border-dashed bg-gray-50' : 'bg-white'
      )}
    >
      {value === '' ? (
        <div className="h-full flex flex-col justify-center items-center text-sm">
          <div>+</div>
          <div>{placeholder}</div>
        </div>
      ) : (
        <img
          width={96}
          height={96}
          src={value}
          alt="uploaded"
          className="bg-img w-24 h-24 m-2 object-cover"
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        disabled={disabled || isLoading}
        className="w-full h-full absolute top-0 left-0"
        onClick={() => ref.current?.click()}
      />
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept={accept}
        disabled={disabled || isLoading}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Index;
