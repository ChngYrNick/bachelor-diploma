import { UniqueID } from '../unique-id.base';

export interface DomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueID;
}
