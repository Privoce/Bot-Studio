import { FC } from 'react';
import { FineTuneEvent } from 'openai';
import dayjs from 'dayjs';
import Drawer from '../drawer';
import Close8 from '../button/close-8';
import Spin from '../../lib/loading/spin';
import Refresh8 from '../button/refresh-8';

interface Props {
  isLoading: boolean;
  events: FineTuneEvent[];
  visible: boolean;
  onCancel: () => void;
  onRefresh: () => void;
}

const Index: FC<Props> = ({ isLoading, events, visible, onCancel, onRefresh }) => (
  <Drawer visible={visible} onClose={onCancel} placement="right">
    <div className="relative bg-white w-screen sm:w-96 overflow-y-auto">
      <div className="z-10 sticky top-0 bg-white text-lg pl-4 pr-2.5 h-13 flex items-center justify-between">
        <div>Fine-tune Events</div>
        <Close8 onClick={onCancel} />
        <div className="border-b absolute bottom-0 left-0 right-0" />
      </div>
      <div className="text-sm px-3 space-y-2 pt-2">
        {events.map((e, i) => (
          <div key={e.created_at} className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center w-2 pt-1">
              <div className="bg-theme-500 rounded-full w-2 h-2" />
              {i !== events.length - 1 && (
                <div className="flex-1 border-l-[3px] border-dotted border-theme-500 mt-1.5 -mb-1.5" />
              )}
            </div>
            <div className="flex items-center text-xs pb-0.5">
              <div className="text-color-secondary">
                {dayjs.unix(e.created_at).format('YYYY/MM/DD HH:mm:ss')}
              </div>
              <div className="ml-1.5 px-1 border rounded text-color-secondary">{e.level}</div>
            </div>
            <div className="text-color-primary rounded-md bg-gray-100 px-3 py-1.5">{e.message}</div>
          </div>
        ))}
        <div className="h-13 flex items-center justify-center">
          {isLoading ? <Spin /> : <Refresh8 onClick={onRefresh} />}
        </div>
      </div>
    </div>
  </Drawer>
);

export default Index;
