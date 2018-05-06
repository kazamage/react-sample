import { Set } from "core-js";

export default class EventEmitter {

  constructor() {
    this.listeners = new Map();
  }

  on(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(listener);
    console.log(this.listeners);
  }

  emit(eventName, ...args) {
    if (!this.listeners.has(eventName)) {
      return;
    }
    this.listeners.get(eventName)
      .forEach(listener => listener(...args));
  }

  removeListener(eventName, listener) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).delete(listener);
    }
    console.log(this.listeners);
  }

  off(eventName, listener) {
    this.removeListener(eventName, listener);
  }

}
