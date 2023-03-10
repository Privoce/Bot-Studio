import { OpenaiConfig } from '../types/config';

const OPENAI_CONFIGS_KEY = 'openai_configs';
const OPENAI_SELECTED_ORG = 'openai_selected_org';

type OpenaiConfigs = Record<string, OpenaiConfig>;

export function getOpenaiConfig(originationId: string): OpenaiConfig | null {
  try {
    const text = localStorage.getItem(OPENAI_CONFIGS_KEY);
    if (text === null) return null;
    const dict = JSON.parse(text) as OpenaiConfigs;
    return dict[originationId] ?? null;
  } catch (e) {
    console.error('get config failed:', e);
    return null;
  }
}

export function getOpenaiConfigList(): OpenaiConfig[] {
  try {
    const text = localStorage.getItem(OPENAI_CONFIGS_KEY);
    if (text === null || text === '') return [];
    const dict = JSON.parse(text) as OpenaiConfigs;
    return Object.values(dict);
  } catch (e) {
    console.error('get configs failed:', e);
    return [];
  }
}

export function setOpenaiConfig(originationId: string, config: OpenaiConfig) {
  try {
    const text = localStorage.getItem(OPENAI_CONFIGS_KEY);
    if (text === null) {
      const dict: Record<string, OpenaiConfig> = { [originationId]: config };
      const dictStr = JSON.stringify(dict);
      localStorage.setItem(OPENAI_CONFIGS_KEY, dictStr);
      return;
    }

    const oldDict: OpenaiConfigs = JSON.parse(text);
    const newDict: OpenaiConfigs = { ...oldDict, [originationId]: config };
    const dictStr = JSON.stringify(newDict);
    localStorage.setItem(OPENAI_CONFIGS_KEY, dictStr);
  } catch (e) {
    console.error('save config failed:', e);
  }
}

export function setSelectedConfig(originationId: string) {
  localStorage.setItem(OPENAI_SELECTED_ORG, originationId);
}

export function getSelectedConfig(): OpenaiConfig | null {
  try {
    const originationId = localStorage.getItem(OPENAI_SELECTED_ORG);
    if (originationId === null) return null;
    return getOpenaiConfig(originationId);
  } catch (e) {
    return null;
  }
}

export function clearOpenaiConfig(id: string) {
  try {
    const text = localStorage.getItem(OPENAI_CONFIGS_KEY);
    if (text === null) {
      return;
    }
    const dict: OpenaiConfigs = JSON.parse(text);
    delete dict[id];
    const dictStr = JSON.stringify(dict);
    localStorage.setItem(OPENAI_CONFIGS_KEY, dictStr);
  } catch (e) {
    console.error('clear config failed:', e);
  }
}
