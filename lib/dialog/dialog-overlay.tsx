import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Index: FC = () => (
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
);

export default Index;
