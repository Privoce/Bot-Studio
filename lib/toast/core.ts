import { ReactNode } from 'react';
import { EventEmitter } from './event-emitter';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';
export type ToastContent = ReactNode;
export interface ToastOptions {
  type: ToastType;
  onClose?: () => void;
}

export interface Toast {
  info: (content: ToastContent, options?: ToastOptions) => void;
  success: (content: ToastContent, options?: ToastOptions) => void;
  warn: (content: ToastContent, options?: ToastOptions) => void;
  error: (content: ToastContent, options?: ToastOptions) => void;
  clear: () => void;
}

// events
export interface ToastEventMap {
  clear: undefined;
  show: { content: ToastContent; options?: ToastOptions };
}

export const eventEmitter = new EventEmitter<ToastEventMap>();
