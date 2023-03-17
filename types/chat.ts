import { CreateCompletionRequest, Model } from 'openai';
import { v4 as uuidv4 } from 'uuid';

export interface Chat {
  id: string;
  model: Model;
  config?: CreateCompletionRequest;
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
      id: 'gpt-3.5-turbo',
      object: 'model',
      created: 1677610602,
      owned_by: 'openai',
    },
    pendingPrompts: [],
    messages: [],
  };
}
