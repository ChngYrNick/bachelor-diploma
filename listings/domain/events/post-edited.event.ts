import { DomainEvent } from '../../shared/event/domain-event.interface';
import { Post } from '../entities/post/post.entity';
import { UniqueID } from '../../shared/unique-id.base';

export class PostEdited implements DomainEvent {
  private readonly _dateOccured: Date = new Date();

  constructor(
    private readonly _previousPostState: Post,
    private readonly _newPostState: Post,
  ) {}

  get dateTimeOccurred(): Date {
    return this._dateOccured;
  }

  get newPost(): Post {
    return this._newPostState;
  }

  get previousPost(): Post {
    return this._previousPostState;
  }

  public getAggregateId(): UniqueID {
    return this.newPost.id;
  }
}
