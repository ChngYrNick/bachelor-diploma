import { DomainEvent } from '../../shared/event/domain-event.interface';
import { Post } from '../entities/post/post.entity';
import { UniqueID } from '../../shared/unique-id.base';

export class PostCreated implements DomainEvent {
  private readonly _dateOccured: Date = new Date();

  constructor(private readonly _post: Post) {}

  get dateTimeOccurred(): Date {
    return this._dateOccured;
  }

  get post(): Post {
    return this._post;
  }

  public getAggregateId(): UniqueID {
    return this.post.id;
  }
}
