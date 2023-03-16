import { CreateCompletionRequest } from 'openai';
import { v4 as uuidv4 } from 'uuid';

export interface Chat {
  id: string;
  modelId: string;
  config?: CreateCompletionRequest;
  pendingPrompts: string[];
  messages: string[];
}

export interface PromptMessage {
  type: 'prompt';
  id: string;
  content: string;
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
    modelId: 'gpt-3.5-turbo',
    pendingPrompts: [],
    messages: [],
  };
}
