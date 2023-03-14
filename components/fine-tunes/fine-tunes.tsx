import { FC, MouseEvent, useState } from 'react';
import { FineTune } from 'openai';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { useMutation } from '@tanstack/react-query';
import IconEvent from '../../assets/material/event_FILL0_wght400_GRAD0_opsz20.svg';
import IconCopy from '../../assets/material/content_copy_FILL0_wght400_GRAD0_opsz20.svg';
import { getSuffix } from '../utils';
import ButtonMore from './button-more';
import DrawerEvents from './drawer-events';
import { useOpenai } from '../../context/openai';
import { useFineTuneStore } from '../../store/use-fine-tune-store';

interface Props {
  fineTunes: FineTune[];
}

const Index: FC<Props> = ({ fineTunes }) => {
  const { openai } = useOpenai();
  const [showEventDrawer, setShowEventDrawer] = useState(false);
  const [fineTune, setFineTune] = useState<FineTune>();
  const events = useFineTuneStore((s) => s.events);
  const setEvents = useFineTuneStore((s) => s.setEvents);

  const listEventMut = useMutation(openai.listFineTuneEvents, {
    onSuccess: (data, id) => setEvents(id, data.data),
  });

  const onClickCopy = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    copy(id);
  };

  const onClickEvent = (f: FineTune) => {
    setFineTune(f);
    setShowEventDrawer(true);
    listEventMut.mutate(f.id);
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
                    onClick={() => onClickEvent(f)}
                  >
                    <IconEvent className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <ButtonMore fineTune={f} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {fineTunes.length === 0 && (
        <div className="text-center text-sm text-color-secondary">No Data</div>
      )}
      {fineTune && (
        <DrawerEvents
          isLoading={listEventMut.isLoading}
          visible={showEventDrawer}
          events={events[fineTune.id] ?? []}
          onCancel={() => setShowEventDrawer(false)}
          onRefresh={() => listEventMut.mutate(fineTune.id)}
        />
      )}
    </div>
  );
};

export default Index;
