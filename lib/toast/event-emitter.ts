export class EventEmitter<M> {
  queue: Map<keyof M, number[]>;

  listeners: Map<keyof M, ((parameters: any) => void)[]>;

  constructor() {
    this.queue = new Map();
    this.listeners = new Map();
  }

  on<T extends keyof M>(
    event: T,
    callback: (...rest: undefined extends M[T] ? [parameters?: M[T]] : [parameters: M[T]]) => void
  ) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
    return this;
  }

  off<T extends keyof M>(event: T, callback?: (parameters: M[T]) => void) {
    if (!callback) {
      this.listeners.delete(event);
      return this;
    }
    const callbacks = (this.listeners.get(event) ?? []).filter((c) => c !== callback);
    this.listeners.set(event, callbacks);
    return this;
  }

  // ...rest: undefined extends M[T] ? [parameters?: M[T]] : [parameters: M[T]]
  emit<T extends keyof M>(event: T, rest?: M[T]) {
    if (!this.listeners.has(event)) return;
    this.listeners.get(event)?.forEach((callback) => {
      const timer = window.setTimeout(() => callback(rest), 0);
      if (!this.queue.has(event)) {
        this.queue.set(event, []);
      }
      this.queue.get(event)?.push(timer);
    });
  }
}
