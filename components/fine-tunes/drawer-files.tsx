import { FC } from 'react';
import { FineTune } from 'openai';
import Drawer from '../drawer';
import Close8 from '../button/close-8';
import H3 from '../heading/h3';
import FilesTable from '../table/files-table';

interface Props {
  fineTune: FineTune;
  visible: boolean;
  onCancel: () => void;
}

const Index: FC<Props> = ({ fineTune, visible, onCancel }) => (
  <Drawer visible={visible} onClose={onCancel} placement="right">
    <div className="relative bg-white w-screen sm:w-[680px] overflow-y-auto">
      <div className="z-10 sticky top-0 bg-white text-xl font-medium pl-4 pr-2.5 h-13 flex items-center justify-between">
        <div>Fine-tune Files</div>
        <Close8 onClick={onCancel} />
        <div className="border-b absolute bottom-0 left-0 right-0" />
      </div>
      <div className="px-4 text-sm">
        <H3>Training Files</H3>
        <FilesTable files={fineTune.training_files} />
        <H3>Validation Files</H3>
        <FilesTable files={fineTune.validation_files} />
        <H3>Result Files</H3>
        <FilesTable files={fineTune.result_files} />
      </div>
    </div>
  </Drawer>
);

export default Index;
