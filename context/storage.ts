import { OpenaiConfig } from '../types/config';
import { CompletionConfig } from '../types/chat';

const OPENAI_CONFIGS_KEY = 'openai_configs';
const OPENAI_SELECTED_ORG = 'openai_selected_org';
const OPENAI_CONFIG_COMPLETION = 'openai_config_completion';

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

export const DEFAULT_COMPLETION_CONFIG: CompletionConfig = {
  suffix: null,
  max_tokens: 256, // common
  temperature: null, // common
  top_p: null, // common
  n: null, // common
  stream: true,
  logprobs: null,
  echo: false,
  stop: null, // common
  presence_penalty: null, // common
  frequency_penalty: null, // common
  best_of: null, // must be greater than n
  logit_bias: null, // common
};

export function getCompletionConfig(): CompletionConfig {
  try {
    const text = localStorage.getItem(OPENAI_CONFIG_COMPLETION);
    if (text === null) return DEFAULT_COMPLETION_CONFIG;
    return JSON.parse(text) as CompletionConfig;
  } catch (e) {
    console.error(e);
    return DEFAULT_COMPLETION_CONFIG;
  }
}

export function setCompletionConfig(config: CompletionConfig) {
  localStorage.setItem(OPENAI_CONFIG_COMPLETION, JSON.stringify(config));
}
