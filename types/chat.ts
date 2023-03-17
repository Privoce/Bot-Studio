import { CreateCompletionRequest, Model } from 'openai';
import { v4 as uuidv4 } from 'uuid';

export type CompletionConfig = Omit<CreateCompletionRequest, 'model' | 'prompt'>;

export interface Chat {
  id: string;
  model: Model;
  config?: CompletionConfig;
  pendingPrompts: string[];
  messages: string[];
}

export interface PromptMessage {
  type: 'prompt';
  id: string;
  content: string;
  createdAt: number;
}

export interface CompletionMessage {
  type: 'completion';
  id: string;
  content: string;
  chatId: string;
  promptId: string;
  duration: number;
}

export type ChatMessage = PromptMessage | CompletionMessage;

export function getDefaultChat(): Chat {
  return {
    id: uuidv4(),
    model: {
      id: 'text-davinci-003',
      object: 'model',
      created: 1677610602,
      owned_by: 'openai-internal',
    },
    pendingPrompts: [],
    messages: [],
  };
}
