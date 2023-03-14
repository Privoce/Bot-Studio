import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FineTune } from 'openai';

interface Store {
  fineTunes: FineTune[];
  setFineTunes: (fineTunes: FineTune[]) => void;
}

export const useFineTuneStore = create(
  immer<Store>((set) => ({
    fineTunes: [],
    setFineTunes: (fineTunes: FineTune[]) =>
      set((state) => {
        state.fineTunes = fineTunes;
      }),
  }))
);
