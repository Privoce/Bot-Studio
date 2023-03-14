import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Dictionary } from '../types/common';
import { Chat, ChatMessage } from '../types/chat';

interface Store {
  chats: Dictionary<Chat>;
  messages: Dictionary<ChatMessage[]>;
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create(
  immer<Store>((set) => ({
    chats: {},
    messages: {},
    addMessage: (message) =>
      set((state) => {
        state.messages[message.chatId] = [message];
      }),
  }))
);
