import { CreateCompletionRequest } from 'openai';
import { v4 as uuidv4 } from 'uuid';

export interface Chat {
  id: string;
  modelId: string;
  config?: CreateCompletionRequest;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  content: string;
  isBot: boolean;
}

export function getDefaultChat(): Chat {
  return {
    id: uuidv4(),
    modelId: 'gpt-3.5-turbo',
  };
}
