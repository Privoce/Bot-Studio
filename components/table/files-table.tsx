import { FC, useState } from 'react';
import { OpenAIFile } from 'openai';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Copy5 from '../button/copy-5';
import ButtonMore from './button-more';
import Dialog from '../../lib/dialog';
import IconDownload from '../../assets/material/download_FILL0_wght400_GRAD0_opsz20.svg';

interface Props {
  isLoading?: boolean;
  files: OpenAIFile[];
  showMore?: boolean;
  onDownload?: (fileId: string) => void;
  onDelete?: (file: OpenAIFile) => void;
}

const bytesFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
});

const Index: FC<Props> = ({ isLoading, files, showMore, onDownload, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selected, setSelected] = useState<OpenAIFile>();
  return (
    <div className="overflow-x-auto text-sm">
      <table>
        <thead>
          <tr
            className={clsx(
              'text-left [&>th]:whitespace-nowrap border-b',
              '[&>th]:font-semibold [&>th]:leading-5 [&>th]:py-2 [&>th]:px-2'
            )}
          >
            <th className="w-px">ID</th>
            <th className="w-full">Filename</th>
            <th className="w-px">Purpose</th>
            <th className="w-px">Status</th>
            <th className="w-px">Created</th>
            <th className="w-px">Size</th>
            <th colSpan={showMore ? 2 : 1} className="w-px text-center">
              More
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr
              key={f.id}
              className="leading-5 text-left [&>td]:py-1.5 [&>td]:px-2 [&>td]:whitespace-nowrap border-b"
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
              <td className="w-px">
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="w-5 h-5 rounded hover-theme hover:text-theme-700"
                  >
                    <IconDownload className="w-5 h-5" />
                  </button>
                </div>
              </td>
              {showMore && (
                <td className="w-px">
                  <div className="flex w-full justify-center">
                    <ButtonMore
                      file={f}
                      onDelete={() => {
                        setSelected(f);
                        setShowDeleteDialog(true);
                      }}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {files.length === 0 && (
        <div className="h-9 flex items-center justify-center text-color-secondary text-sm">
          No Data
        </div>
      )}
      {selected && (
        <Dialog
          visible={showDeleteDialog}
          title="Delete file"
          description={`Are you sure you want to delete file: ${selected.filename} ?`}
          showCancel
          showDanger
          cancelText="Cancel"
          dangerText="Delete"
          cancelDisabled={isLoading}
          dangerDisabled={isLoading}
          onCancel={() => setShowDeleteDialog(false)}
          onDanger={() => onDelete?.(selected)}
        />
      )}
    </div>
  );
};

export default Index;
