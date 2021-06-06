export class PostRated implements DomainEvent {
  private readonly _dateOccured: Date = new Date();

  constructor(private readonly _vote: PostVote) {}

  get dateTimeOccurred(): Date {
    return this._dateOccured;
  }

  get postVote(): PostVote {
    return this._vote;
  }

  public getAggregateId(): UniqueID {
    return this.postVote.id;
  }
}
