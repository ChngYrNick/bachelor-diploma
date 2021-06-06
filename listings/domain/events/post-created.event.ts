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
