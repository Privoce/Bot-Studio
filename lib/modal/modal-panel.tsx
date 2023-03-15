import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  className?: string;
  children?: ReactNode;
}

const Index: FC<Props> = ({ children, className }) => (
  <div className="fixed inset-0 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Dialog.Panel as="div" className={className}>
          {children}
        </Dialog.Panel>
      </Transition.Child>
    </div>
  </div>
);

export default Index;
