import { FC, MouseEvent } from 'react';
import { FineTune } from 'openai';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import IconEvent from '../../assets/material/event_FILL0_wght400_GRAD0_opsz20.svg';
import IconCopy from '../../assets/material/content_copy_FILL0_wght400_GRAD0_opsz20.svg';
import { getSuffix } from '../utils';
import ButtonMore from './button-more';

interface Props {
  fineTunes: FineTune[];
}

const Index: FC<Props> = ({ fineTunes }) => {
  const onClickCopy = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    copy(id);
  };

  return (
    <div className="overflow-x-auto text-sm">
      <table>
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
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Events</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {fineTunes.map((f) => (
            <tr
              key={f.id}
              className="leading-5 text-left [&>td]:py-1.5 [&>td]:px-2.5 [&>td]:whitespace-nowrap border-b"
            >
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <button type="button" className="w-5 h-5" onClick={onClickCopy(f.id)}>
                    <IconCopy className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="w-px">{f.model}</td>
              <td className="w-px">{getSuffix(f.fine_tuned_model)}</td>
              <td className="w-px">{f.status}</td>
              <td className="w-px">{f.created_at}</td>
              <td className="w-px">{f.updated_at}</td>
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <button
                    type="button"
                    className="w-5 h-5 rounded hover-theme hover:text-theme-700"
                  >
                    <IconEvent className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <ButtonMore />
                </div>
              </td>
            </tr>
          ))}
          {fineTunes.length === 0 && (
            <div className="text-center text-sm text-color-secondary">No Data</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
