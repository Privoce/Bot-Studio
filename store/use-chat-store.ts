import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CreateCompletionRequest } from 'openai';
import { Dictionary } from '../types/common';
import { Chat, ChatMessage, getDefaultChat } from '../types/chat';

type Settings = Omit<CreateCompletionRequest, 'model' | 'prompt'>;

const DEFAULT_CHAT = getDefaultChat();

interface Store {
  settings: Settings;
  list: string[];
  chats: Dictionary<Chat>;
  messages: Dictionary<ChatMessage[]>;
  addChat: (chat: Chat) => void;
  removeChat: (chatId: string) => void;
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create(
  immer<Store>((set) => ({
    settings: {
      suffix: undefined,
      max_tokens: 16,
      temperature: 1,
      top_p: 1,
      n: 1,
      stream: true,
      logprobs: undefined,
      echo: false,
      stop: undefined,
      presence_penalty: 0,
      frequency_penalty: 0,
      best_of: 1, // must be greater than n
      logit_bias: undefined,
      user: undefined,
    },
    list: [DEFAULT_CHAT.id],
    chats: { [DEFAULT_CHAT.id]: DEFAULT_CHAT },
    messages: {},
    addChat: (chat) =>
      set((state) => {
        state.list.push(chat.id);
        state.chats[chat.id] = chat;
      }),
    removeChat: (chatId) =>
      set((state) => {
        state.list = state.list.filter((id) => id !== chatId);
        delete state.chats[chatId];
        delete state.messages[chatId];
      }),
    addMessage: (message) =>
      set((state) => {
        state.messages[message.chatId] = [message];
      }),
  }))
);
