import EventEmitter from 'events';

import { DomainEvent } from './domain-event.interface';
import { UniqueID } from '../unique-id.base';
import { AggregateRoot } from '../aggregate-root.base';

export class DomainEvents {
  private static _eventEmitter: EventEmitter = new EventEmitter();
  private static _markedAggregates: AggregateRoot[] = [];

  public static register(
    callback: (event: DomainEvent) => void,
    eventClassName: string,
  ): void {
    this._eventEmitter.on(eventClassName, callback);
  }

  public static dispatch(event: DomainEvent): void {
    this._eventEmitter.emit(event.constructor.name, event);
  }

  public static dispatchAggregateEvents(aggregate: AggregateRoot): void {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event),
    );
  }

  public static dispatchEventsForAggregate(id: UniqueID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static findMarkedAggregateByID(id: UniqueID): AggregateRoot | null {
    return (
      this._markedAggregates.find(aggregateRoot =>
        aggregateRoot.id.equals(id),
      ) || null
    );
  }

  public static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot,
  ): void {
    const index = this._markedAggregates.findIndex(a => a.equals(aggregate));
    this._markedAggregates.splice(index, 1);
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot): void {
    const foundAggregate = !!this.findMarkedAggregateByID(aggregate.id);

    if (!foundAggregate) {
      this._markedAggregates.push(aggregate);
    }
  }
}
