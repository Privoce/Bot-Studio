import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Device {
  isMobile: boolean;
  isSafari: boolean;
  isFirefox: boolean;
}

interface Store {
  device: Device;
  updateDevice: (device: Device) => void;
}

export const useClientStore = create(
  immer<Store>((set) => ({
    device: {
      isSafari: false,
      isFirefox: false,
      isMobile: false,
    },
    updateDevice: (device) =>
      set((state) => {
        state.device = device;
      }),
  }))
);
