import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Model } from 'openai';

interface Store {
  models: Model[];
  setModels: (models: Model[]) => void;
}

export const useModelStore = create(
  immer<Store>((set) => ({
    models: [],
    setModels: (models) =>
      set((state) => {
        state.models = models;
      }),
  }))
);
