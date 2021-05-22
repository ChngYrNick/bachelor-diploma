import { Entity } from './entity.base';
import { DomainEvent } from './event/domain-event.interface';
import { DomainEvents } from './event/domain-events.base';

export class AggregateRoot extends Entity {
  private readonly _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);

    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this.domainEvents.splice(0, this.domainEvents.length);
  }
}
