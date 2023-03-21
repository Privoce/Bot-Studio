import { FC, Fragment, ReactNode, useEffect, useState, CSSProperties } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { eventEmitter, ToastContent, ToastOptions, Toast, ToastType } from './core';

function getBackgroundColorByType(type?: ToastType) {
  switch (type) {
    case 'success':
      return 'bg-emerald-400';
    case 'warning':
      return 'bg-yellow-400';
    case 'error':
      return 'bg-red-400';
    default:
      return 'bg-blue-400';
  }
}

interface Props {
  timeout?: number;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  bodyStyle?: CSSProperties;
  bodyClassName?: string;
  toastStyle?: CSSProperties;
  toastClassName?: string;
}

export const ToastContainer: FC<Props> = ({
  timeout = 3000,
  containerStyle,
  containerClassName,
  bodyStyle,
  bodyClassName,
  toastStyle,
  toastClassName,
}) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<number>();
  const [content, setContent] = useState<ReactNode>();
  const [options, setOptions] = useState<ToastOptions>();

  useEffect(() => {
    eventEmitter.on('show', ({ content: newContent, options: newOptions }) => {
      setShow(true);
      setContent(newContent);
      setOptions(newOptions);
      setTimer(window.setTimeout(() => setShow(false), timeout));
    });

    return () => {
      eventEmitter.off('show');
      eventEmitter.off('clear');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseEnter = () => window.clearTimeout(timer);
  const onMouseLeave = () => setTimer(window.setTimeout(() => setShow(false), timeout));

  return (
    <div
      style={containerStyle}
      className={clsx(
        'z-50 fixed w-auto right-1/2 top-6 translate-x-1/2 pointer-events-none',
        containerClassName
      )}
    >
      <div
        className={clsx('relative flex items-center justify-center', bodyClassName)}
        style={bodyStyle}
      >
        <Transition
          appear
          show={show}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={clsx(
              'pointer-events-auto',
              'rounded-lg max-w-[320px] min-h-[40px] text-white text-md py-2.5 px-4 leading-5',
              getBackgroundColorByType(options?.type),
              toastClassName
            )}
            style={toastStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {content}
          </div>
        </Transition>
      </div>
    </div>
  );
};

function createByType(type: ToastType) {
  return (content: ToastContent, options?: ToastOptions) => {
    eventEmitter.emit('show', { content, options: options ?? { type } });
  };
}

export const toast: Toast = {
  info: createByType('info'),
  success: createByType('success'),
  warn: createByType('warning'),
  error: createByType('error'),
  clear: () => eventEmitter.emit('clear'),
};
