import { DomainEvent } from '../../shared/event/domain-event.interface';
import { Comment } from '../entities/comment/comment.entity';
import { UniqueID } from '../../shared/unique-id.base';

export class CommentPosted implements DomainEvent {
  private readonly _dateOccured: Date = new Date();

  constructor(private readonly _comment: Comment) {}

  get dateTimeOccurred(): Date {
    return this._dateOccured;
  }

  get comment(): Comment {
    return this._comment;
  }

  public getAggregateId(): UniqueID {
    return this.comment.id;
  }
}
