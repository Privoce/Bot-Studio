import { FC, useState } from 'react';
import { FineTune } from 'openai';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import IconEvent from '../../assets/material/event_FILL0_wght400_GRAD0_opsz20.svg';
import IconFile from '../../assets/material/article_FILL0_wght400_GRAD0_opsz20.svg';
import { getSuffix } from '../utils';
import ButtonMore from './button-more';
import DrawerEvents from './drawer-events';
import { useOpenai } from '../../context/openai';
import { useFineTuneStore } from '../../store/use-fine-tune-store';
import DrawerFiles from './drawer-files';
import Copy5 from '../button/copy-5';
import Dialog from '../../lib/dialog';

interface Props {
  fineTunes: FineTune[];
}

const Index: FC<Props> = ({ fineTunes }) => {
  const { openai } = useOpenai();
  const [showFileDrawer, setShowFileDrawer] = useState(false);
  const [showEventDrawer, setShowEventDrawer] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selected, setSelected] = useState<FineTune>();
  const events = useFineTuneStore((s) => s.events);
  const setEvents = useFineTuneStore((s) => s.setEvents);
  const setFineTune = useFineTuneStore((s) => s.setFineTune);

  const listEventMut = useMutation(openai.listFineTuneEvents, {
    onSuccess: (data, id) => setEvents(id, data.data),
  });

  const cancelMut = useMutation(openai.cancelFineTune, {
    onSuccess: (data) => {
      setFineTune(data);
      setShowCancelDialog(false);
    },
  });

  const onClickFile = (f: FineTune) => {
    setSelected(f);
    setShowFileDrawer(true);
  };

  const onClickEvent = (f: FineTune) => {
    setSelected(f);
    setShowEventDrawer(true);
    listEventMut.mutate(f.id);
  };

  const onClickCancel = (f: FineTune) => {
    setSelected(f);
    setShowCancelDialog(true);
  };

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
            <th className="w-px">Model</th>
            <th className="w-full">Suffix</th>
            <th className="w-px">Status</th>
            <th className="w-px">Created</th>
            <th className="w-px">Updated</th>
            <th className="w-px">Files</th>
            <th className="w-px">Events</th>
            <th className="w-px">More</th>
          </tr>
        </thead>
        <tbody>
          {fineTunes.map((f) => (
            <tr
              key={f.id}
              className="leading-5 text-left [&>td]:py-1.5 [&>td]:px-2 [&>td]:whitespace-nowrap border-b"
            >
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <Copy5 copyText={f.id} />
                </div>
              </td>
              <td className="w-px">{f.model}</td>
              <td className="w-full">{getSuffix(f.fine_tuned_model)}</td>
              <td className="w-px">{f.status}</td>
              <td className="w-px">{f.created_at}</td>
              <td className="w-px">{f.updated_at}</td>
              <td className="w-px">
                <div className="flex w-full justify-center">
                  <button
                    type="button"
                    className="w-5 h-5 rounded hover-theme hover:text-theme-700"
                    onClick={() => onClickFile(f)}
                  >
                    <IconFile className="w-5 h-5" />
                  </button>
                </div>
              </td>
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
                  <ButtonMore fineTune={f} onCancel={onClickCancel} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {fineTunes.length === 0 && (
        <div className="text-center text-sm text-color-secondary">No Data</div>
      )}
      {selected && (
        <DrawerEvents
          isLoading={listEventMut.isLoading}
          visible={showEventDrawer}
          events={events[selected.id] ?? []}
          onCancel={() => setShowEventDrawer(false)}
          onRefresh={() => listEventMut.mutate(selected.id)}
        />
      )}
      {selected && (
        <DrawerFiles
          visible={showFileDrawer}
          fineTune={selected}
          onCancel={() => setShowFileDrawer(false)}
        />
      )}
      {selected && (
        <Dialog
          title="Cancel fine-tune"
          description={`Are you sure you want to cancel fine-tune: ${selected.id} ?`}
          visible={showCancelDialog}
          showCancel
          showDanger
          cancelText="No"
          dangerText="Yes"
          cancelDisabled={cancelMut.isLoading}
          dangerDisabled={cancelMut.isLoading}
          onCancel={() => setShowCancelDialog(false)}
          onDanger={() => cancelMut.mutate(selected.id)}
        />
      )}
    </div>
  );
};

export default Index;
