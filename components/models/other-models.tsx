import { FC } from 'react';
import { Model } from 'openai';
import clsx from 'clsx';
import Copy5 from '../button/copy-5';

interface Props {
  models: Model[];
}

const Index: FC<Props> = ({ models }) => (
  <div className="overflow-x-auto">
    <table className="text-sm mt-2">
      <thead>
        <tr
          className={clsx(
            'text-left [&>th]:whitespace-nowrap border-b',
            '[&>th]:font-semibold [&>th]:leading-5 [&>th]:py-2 [&>th]:px-2'
          )}
        >
          <th className="w-px">ID</th>
          <th className="w-full">Model</th>
          <th className="w-px">Owned By</th>
          <th className="w-px">Created</th>
        </tr>
      </thead>
      <tbody>
        {models.map((m) => (
          <tr
            key={m.id}
            className="leading-5 text-left [&>td]:py-1.5 [&>td]:px-2 [&>td]:whitespace-nowrap border-b"
          >
            <td className="w-px">
              <div className="flex w-full justify-center">
                <Copy5 copyText={m.id} />
              </div>
            </td>
            <td className="w-full">{m.id}</td>
            <td className="w-px">{m.owned_by}</td>
            <td className="w-px">{new Date(m.created * 1000).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Index;
