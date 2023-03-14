import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FineTune, FineTuneEvent } from 'openai';
import { Dictionary } from '../types/common';

interface Store {
  fineTunes: FineTune[];
  events: Dictionary<FineTuneEvent[]>;
  setFineTune: (fineTune: FineTune) => void;
  setFineTunes: (fineTunes: FineTune[]) => void;
  setEvents: (fineTuneId: string, events: FineTuneEvent[]) => void;
}

export const useFineTuneStore = create(
  immer<Store>((set) => ({
    fineTunes: [],
    events: {},
    setFineTune: (fineTune) =>
      set((state) => {
        state.fineTunes = state.fineTunes.map((f) => (f.id === fineTune.id ? fineTune : f));
      }),
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
