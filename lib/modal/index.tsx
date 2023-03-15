import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ModalPanel from './modal-panel';
import ModalOverlay from './modal-overlay';

interface Props {
  visible?: boolean;
  children: ReactNode;
  className?: string;
  onCancel?: () => void;
}

const Index: FC<Props> = ({ visible, onCancel, children, className }) => (
  <Transition appear show={visible} as={Fragment}>
    <Dialog as="div" onClose={() => onCancel?.()} className="relative z-50">
      <ModalOverlay />
      <ModalPanel className={className}>{children}</ModalPanel>
    </Dialog>
  </Transition>
);

export default Index;
