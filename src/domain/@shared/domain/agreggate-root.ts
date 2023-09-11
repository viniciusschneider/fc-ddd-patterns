import EventHandlerInterface from "../event/event-handler.interface";
import EventInterface from "../event/event.interface";

export abstract class AgreggateRoot<T extends EventInterface = EventInterface> {
  private events: Record<string, T[]> = {};

  addEvent(key: string, event: T) {
    if (!this.events[key])
    this.events[key] = [];

    this.events[key].push(event);
  }

  clearEvents() {
    this.events = {};
  }

  getEventsByKey(key: string) {
    return this.events[key] ?? [];
  }
}
