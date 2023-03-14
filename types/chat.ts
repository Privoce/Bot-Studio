export interface Chat {
  id: string;
  modelId: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  content: string;
  isBot: boolean;
}
