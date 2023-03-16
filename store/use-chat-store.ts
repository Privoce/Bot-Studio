import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CreateCompletionRequest } from 'openai';
import { Dictionary } from '../types/common';
import { Chat, ChatMessage, CompletionMessage, getDefaultChat, PromptMessage } from '../types/chat';

type Settings = Omit<CreateCompletionRequest, 'model' | 'prompt'>;

const DEFAULT_CHAT = getDefaultChat();

interface Store {
  chats: Dictionary<Chat>;
  messages: Dictionary<ChatMessage>;
  chatIds: string[];
  settings: Settings;
  addChat: (chat: Chat) => void;
  removeChat: (chatId: string) => void;
  addPrompt: (message: PromptMessage) => void;
  startCompletion: (message: CompletionMessage) => void;
  updateCompletion: (message: { id: string; content: string }) => void;
  endCompletion: (message: CompletionMessage) => void;
}

export const useChatStore = create(
  immer<Store>((set) => ({
    chats: { [DEFAULT_CHAT.id]: DEFAULT_CHAT },
    messages: {},
    chatIds: [DEFAULT_CHAT.id],
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
    addChat: (chat) =>
      set((state) => {
        state.chatIds.push(chat.id);
        state.chats[chat.id] = chat;
      }),
    removeChat: (chatId) =>
      set((state) => {
        // delete message
        state.chats[chatId]?.messages.forEach((messageId) => {
          if (state.messages[messageId]?.type === 'completion') {
            delete state.messages[messageId];
          }
        });
        // delete chat
        state.chatIds = state.chatIds.filter((id) => id !== chatId);
        delete state.chats[chatId];
      }),
    addPrompt: (message) =>
      set((state) => {
        state.messages[message.id] = message;
        state.chatIds.forEach((chatId) => {
          state.chats[chatId]?.messages.push(message.id);
          state.chats[chatId]?.pendingPrompts.push(message.id);
        });
      }),
    startCompletion: (message) =>
      set((state) => {
        state.messages[message.id] = message;
        state.chats[message.chatId]?.messages.push(message.id);
      }),
    updateCompletion: (message) =>
      set((state) => {
        if (state.messages[message.id]) {
          state.messages[message.id]!.content += message.content;
        }
      }),
    endCompletion: (message) =>
      set((state) => {
        if (state.chats[message.chatId]) {
          // remove pending prompt
          state.chats[message.chatId]!.pendingPrompts = state.chats[
            message.chatId
          ]!.pendingPrompts.filter((pid) => pid !== message.promptId);
        }
      }),
  }))
);
