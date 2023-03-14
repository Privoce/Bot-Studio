import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface Props {
  visible: boolean;
  children?: ReactNode;
  placement?: Placement;
  onClose: () => void;
}

interface PlacementClass {
  top: string;
  bottom: string;
  right: string;
  left: string;
}

const ENTER_FROM: PlacementClass = {
  top: '-translate-y-full',
  bottom: 'translate-y-full',
  left: '-translate-x-full',
  right: 'translate-x-full',
};

const ENTER_TO: PlacementClass = {
  top: 'translate-y-0',
  bottom: 'translate-y-0',
  left: 'translate-x-0',
  right: 'translate-x-0',
};

const LEAVE_FROM: PlacementClass = {
  top: 'translate-y-0',
  bottom: 'translate-y-0',
  left: 'translate-x-0',
  right: 'translate-x-0',
};

const LEAVE_TO: PlacementClass = {
  top: '-translate-y-full',
  bottom: 'translate-y-full',
  left: '-translate-x-full',
  right: 'translate-x-full',
};

const FLEX: PlacementClass = {
  top: 'items-start',
  bottom: 'items-end',
  left: 'justify-start',
  right: 'justify-end',
};

const Index: FC<Props> = ({ visible, children, placement = 'left', onClose }) => (
  <Transition appear show={visible} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-20 dark:bg-gray-900 dark:bg-opacity-80 backdrop-blur-sm" />
      </Transition.Child>
      <div className="fixed inset-0">
        <div className={`flex h-full min-h-full ${FLEX[placement]}`}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={ENTER_FROM[placement]}
            enterTo={ENTER_TO[placement]}
            leave="transition ease-in-out duration-300 transform"
            leaveFrom={LEAVE_FROM[placement]}
            leaveTo={LEAVE_TO[placement]}
          >
            <Dialog.Panel
              as="div"
              className={
                placement === 'left' || placement === 'right'
                  ? 'h-full min-h-full [&>*]:h-full'
                  : 'w-full min-w-full [&>*]:w-full'
              }
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default Index;
