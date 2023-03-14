import { FC, MouseEvent, useState } from 'react';
import clsx from 'clsx';
import { Model } from 'openai';
import copy from 'copy-to-clipboard';
import { useMutation } from '@tanstack/react-query';
import IconCopy from '../../assets/material/content_copy_FILL0_wght400_GRAD0_opsz20.svg';
import IconDelete from '../../assets/material/delete_FILL0_wght400_GRAD0_opsz20.svg';
import Dialog from '../../lib/dialog';
import { useOpenai } from '../../context/openai';
import { getSuffix } from '../utils';

interface Props {
  models: Model[];
  onDelete: (id: string) => void;
}

const Index: FC<Props> = ({ models, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selected, setSelected] = useState<Model>();

  const onClickDelete = (m: Model) => (e: MouseEvent) => {
    e.stopPropagation();
    setSelected(m);
    setShowDeleteDialog(true);
  };

  const onClickCopy = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    copy(id);
  };

  const { openai } = useOpenai();
  const { mutate } = useMutation(openai.deleteModel, {
    onSuccess: (_, id) => {
      onDelete(id);
      setShowDeleteDialog(false);
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="text-sm mt-2">
        <thead>
          <tr
            className={clsx(
              'text-left [&>th]:whitespace-nowrap border-b',
              '[&>th]:font-semibold [&>th]:leading-5 [&>th]:py-2 [&>th]:px-2.5'
            )}
          >
            <th>ID</th>
            <th>Model</th>
            <th>Suffix</th>
            <th>Owned By</th>
            <th colSpan={2}>Created</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr
              key={m.id}
              className="leading-5 text-left [&>td]:py-1.5 [&>td]:px-2.5 [&>td]:whitespace-nowrap border-b"
            >
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <button type="button" className="w-5 h-5" onClick={onClickCopy(m.id)}>
                    <IconCopy className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td>{m.id.split(':')[0]}</td>
              <td>{getSuffix(m.id)}</td>
              <td className="w-px">{m.owned_by}</td>
              <td className="w-px">{new Date(m.created * 1000).toLocaleDateString()}</td>
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <button
                    type="button"
                    className="w-5 h-5 rounded hover:bg-red-200 hover:text-red-700"
                    onClick={onClickDelete(m)}
                  >
                    <IconDelete className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <Dialog
          visible={showDeleteDialog}
          showCancel
          showDanger
          title="Delete Model"
          description={`Are you sure you want to delete this model: ${selected.id} ?`}
          cancelText="Cancel"
          dangerText="Delete"
          onCancel={() => setShowDeleteDialog(false)}
          onDanger={() => mutate(selected.id)}
        />
      )}
    </div>
  );
};

export default Index;