import { DomainEvent } from './domain-event.interface';

export interface Handler {
  handle(event: DomainEvent): void;
}
