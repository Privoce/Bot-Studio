import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FineTune, FineTuneEvent } from 'openai';
import { Dictionary } from '../types/common';

interface Store {
  fineTunes: FineTune[];
  events: Dictionary<FineTuneEvent[]>;
  setFineTunes: (fineTunes: FineTune[]) => void;
  setEvents: (fineTuneId: string, events: FineTuneEvent[]) => void;
}

export const useFineTuneStore = create(
  immer<Store>((set) => ({
    fineTunes: [],
    events: {},
    setFineTunes: (fineTunes: FineTune[]) =>
      set((state) => {
        state.fineTunes = fineTunes;
      }),
    setEvents: (fineTuneId, events) =>
      set((state) => {
        state.events[fineTuneId] = events;
      }),
  }))
);
