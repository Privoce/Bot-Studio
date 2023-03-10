import { FC, MouseEvent } from 'react';
import { Model } from 'openai';
import copy from 'copy-to-clipboard';
import clsx from 'clsx';
import IconCopy from '../../assets/material/content_copy_FILL0_wght400_GRAD0_opsz20.svg';

interface Props {
  models: Model[];
}

const Index: FC<Props> = ({ models }) => {
  const onCopy = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    copy(id);
  };

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
            <th>Owned By</th>
            <th>Created</th>
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
                  <button type="button" className="w-5 h-5" onClick={onCopy(m.id)}>
                    <IconCopy className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td>{m.id}</td>
              <td className="w-px">{m.owned_by}</td>
              <td className="w-px">{new Date(m.created * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
