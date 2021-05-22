import { DomainEvent } from '../../shared/event/domain-event.interface';
import { Member } from '../entities/member/member.entity';
import { UniqueID } from '../../shared/unique-id.base';

export class MemberCreated implements DomainEvent {
  private readonly _dateOccured: Date = new Date();

  constructor(private readonly _member: Member) {}

  get dateTimeOccurred(): Date {
    return this._dateOccured;
  }

  get member(): Member {
    return this._member;
  }

  public getAggregateId(): UniqueID {
    return this.member.id;
  }
}
