import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import DialogOverlay from './dialog-overlay';
import DialogPanel from './dialog-panel';

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
    <Dialog as="div" className="relative z-50" onClose={() => onCancel?.()}>
      <DialogOverlay />
      <DialogPanel>
        <div
          className={clsx(
            'w-80 p-5 my-8 rounded-2xl shadow-lg',
            'transition-all transform bg-white dark:bg-gray-800'
          )}
        >
          <h3 className="text-lg font-medium leading-6 text-color-primary text-center">
            {props.title}
          </h3>
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
      </DialogPanel>
    </Dialog>
  </Transition>
);

export default Index;
