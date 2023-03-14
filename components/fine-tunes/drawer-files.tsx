import { FC } from 'react';
import { FineTune, OpenAIFile } from 'openai';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Drawer from '../drawer';
import Close8 from '../button/close-8';
import H3 from '../heading/h3';
import Copy5 from '../button/copy-5';

interface Props {
  fineTune: FineTune;
  visible: boolean;
  onCancel: () => void;
}

const bytesFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
});

const FileTable: FC<{ files: OpenAIFile[] }> = ({ files }) => (
  <div className="overflow-x-auto">
    <table>
      <thead>
        <tr
          className={clsx(
            'text-left [&>th]:whitespace-nowrap border-b',
            '[&>th]:font-semibold [&>th]:leading-5 [&>th]:py-2 [&>th]:px-2.5'
          )}
        >
          <th className="w-px">ID</th>
          <th className="w-full">Filename</th>
          <th className="w-px">Purpose</th>
          <th className="w-px">Status</th>
          <th className="w-px">Created</th>
          <th className="w-px">Size</th>
        </tr>
      </thead>
      <tbody>
        {files.map((f) => (
          <tr
            key={f.id}
            className="leading-5 text-left [&>td]:py-1.5 [&>td]:px-2.5 [&>td]:whitespace-nowrap border-b"
          >
            <td className="w-px">
              <div className="flex justify-center">
                <Copy5 copyText={f.id} />
              </div>
            </td>
            <td className="w-full">{f.filename}</td>
            <td className="w-px">{f.purpose}</td>
            <td className="w-px">{f.status}</td>
            <td className="w-px">{dayjs.unix(f.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td className="w-px">{bytesFormatter.format(f.bytes)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {files.length === 0 && (
      <div className="h-9 flex items-center justify-center text-color-secondary text-sm">
        No Data
      </div>
    )}
  </div>
);

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
        <FileTable files={fineTune.training_files} />
        <H3>Validation Files</H3>
        <FileTable files={fineTune.validation_files} />
        <H3>Result Files</H3>
        <FileTable files={fineTune.result_files} />
      </div>
    </div>
  </Drawer>
);

export default Index;
