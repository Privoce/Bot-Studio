import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Model } from 'openai';
import { Dictionary } from '../types/common';
import {
  Chat,
  ChatMessage,
  CompletionConfig,
  CompletionMessage,
  getDefaultChat,
  PromptMessage,
} from '../types/chat';
import {
  DEFAULT_COMPLETION_CONFIG,
  getCompletionConfig,
  setCompletionConfig,
} from '../context/storage';

const DEFAULT_CHAT = getDefaultChat();

interface Store {
  chats: Dictionary<Chat>;
  messages: Dictionary<ChatMessage>;
  chatIds: string[];
  globalConfig: CompletionConfig;
  updateGlobalConfig: (config: CompletionConfig) => void;
  resetGlobalConfig: () => void;
  addChat: (chat: Chat) => void;
  removeChat: (chatId: string) => void;
  updateModel: (chatId: string, model: Model) => void;
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
    globalConfig: getCompletionConfig(),
    updateGlobalConfig: (config) =>
      set((state) => {
        state.globalConfig = config;
        setCompletionConfig(config);
      }),
    resetGlobalConfig: () =>
      set((state) => {
        state.globalConfig = DEFAULT_COMPLETION_CONFIG;
        setCompletionConfig(DEFAULT_COMPLETION_CONFIG);
      }),
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
    updateModel: (chatId, model) =>
      set((state) => {
        if (state.chats[chatId]) {
          state.chats[chatId]!.model = model;
        }
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
        if (state.messages[message.id]) {
          (state.messages[message.id]! as CompletionMessage).duration = message.duration;
        }
        if (state.chats[message.chatId]) {
          // remove pending prompt
          state.chats[message.chatId]!.pendingPrompts = state.chats[
            message.chatId
          ]!.pendingPrompts.filter((pid) => pid !== message.promptId);
        }
      }),
  }))
);
