import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { OpenaiConfig } from '../types/config';
import * as storage from './storage';
import { OpenAIApi } from './client';

export interface OpenaiContextValue {
  openai: OpenAIApi;
  config: OpenaiConfig | null;
  saveConfig: (newConfig: OpenaiConfig) => void;
  selectConfig: (originationId: string) => void;
}

const defaultOpenai = new OpenAIApi('');
const OpenaiContext = createContext<OpenaiContextValue>({
  openai: defaultOpenai,
  config: null,
  saveConfig: () => {},
  selectConfig: () => {},
});

export function useOpenai() {
  return useContext<OpenaiContextValue>(OpenaiContext);
}

export const OpenaiContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<OpenaiConfig | null>(null);
  const [openai, setOpenai] = useState<OpenAIApi>(defaultOpenai);

  const router = useRouter();
  useEffect(() => {
    const selected = storage.getSelectedConfig();
    if (selected === null && router.pathname !== '/onboarding') {
      router.push('/onboarding');
      return;
    }
    setConfig(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!config) return;
    setOpenai(new OpenAIApi(config.apiKey));
  }, [config]);

  const value = useMemo<OpenaiContextValue>(
    () => ({
      openai,
      config,
      saveConfig: (newConfig) => storage.setOpenaiConfig(newConfig.originationId, newConfig),
      selectConfig: (originationId) => {
        storage.setSelectedConfig(originationId);
        setConfig(storage.getSelectedConfig());
      },
    }),
    [config, openai]
  );
  return <OpenaiContext.Provider value={value}>{children}</OpenaiContext.Provider>;
};
