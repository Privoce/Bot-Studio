import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

export interface Props {
  visible?: boolean;
  showDanger?: boolean;
  showConfirm?: boolean;
  showCancel?: boolean;
  title?: string;
  description?: string | ReactNode;
  dangerText?: string;
  confirmText?: string;
  cancelText?: string;
  dangerDisabled?: boolean;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;
  onDanger?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Index: FC<Props> = ({ visible, onCancel, ...props }) => (
  <Transition appear show={visible} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={onCancel || (() => {})}
    >
      <div className="min-h-screen text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-20 dark:bg-gray-900 dark:bg-opacity-80 backdrop-blur-sm" />
        </Transition.Child>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
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
              'inline-block w-full max-w-xs p-5 my-8 text-left align-middle rounded-2xl',
              'transition-all transform bg-white dark:bg-gray-800 shadow-lg'
            )}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-color-primary text-center"
            >
              {props.title}
            </Dialog.Title>
            <div className="mt-2 text-sm text-color-secondary">{props.description}</div>
            <div className="flex mt-6 space-x-2">
              {props.showDanger && (
                <button
                  type="button"
                  disabled={props.dangerDisabled}
                  className={clsx(
                    'flex-1 inline-flex justify-center px-4 py-1.5 text-sm rounded-md  ',
                    'border border-transparent disabled:cursor-not-allowed',
                    'text-red-900 bg-red-100 hover:bg-red-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                  )}
                  onClick={props.onDanger}
                >
                  {props.dangerText}
                </button>
              )}
              {props.showConfirm && (
                <button
                  type="button"
                  disabled={props.confirmDisabled}
                  className={clsx(
                    'flex-1 inline-flex justify-center px-4 py-1.5 text-sm rounded-md  ',
                    'border border-transparent disabled:cursor-not-allowed',
                    'text-blue-900 bg-blue-100 hover:bg-blue-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                  )}
                  onClick={props.onConfirm}
                >
                  {props.confirmText}
                </button>
              )}
              {props.showCancel && (
                <button
                  type="button"
                  disabled={props.cancelDisabled}
                  className={clsx(
                    'flex-1 inline-flex justify-center px-4 py-1.5 text-sm rounded-lg',
                    'border border-transparent disabled:cursor-not-allowed',
                    'text-gray-900 bg-gray-100 hover:bg-gray-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                  )}
                  onClick={onCancel}
                >
                  {props.cancelText}
                </button>
              )}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default Index;
