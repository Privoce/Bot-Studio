import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FineTune, FineTuneEvent, OpenAIFile } from 'openai';
import { Dictionary } from '../types/common';

interface Store {
  files: OpenAIFile[];
  fineTunes: FineTune[];
  events: Dictionary<FineTuneEvent[]>;
  addFineTune: (fineTune: FineTune) => void;
  setFineTune: (fineTune: FineTune) => void;
  setFineTunes: (fineTunes: FineTune[]) => void;
  setEvents: (fineTuneId: string, events: FineTuneEvent[]) => void;
  addFile: (file: OpenAIFile) => void;
  setFiles: (files: OpenAIFile[]) => void;
  removeFile: (fileId: string) => void;
}

export const useFineTuneStore = create(
  immer<Store>((set) => ({
    files: [],
    fineTunes: [],
    events: {},
    addFineTune: (fineTune) =>
      set((state) => {
        state.fineTunes.push(fineTune);
      }),
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
    addFile: (file) =>
      set((state) => {
        state.files.push(file);
      }),
    setFiles: (files) =>
      set((state) => {
        state.files = files;
      }),
    removeFile: (fileId) =>
      set((state) => {
        state.files = state.files.filter((f) => f.id !== fileId);
      }),
  }))
);
