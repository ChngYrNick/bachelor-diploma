import { AggregateRoot } from '../../../shared/aggregate-root.base';
import { UserName } from './username.value';
import { Email } from './email.value';
import { FirstName } from './first-name.value';
import { LastName } from './last-name.value';
import { UniqueID } from '../../../shared/unique-id.base';
import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { MemberCreated } from '../../events/member-created.event';

interface MemberProps {
  username: UserName;
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  memberId?: UniqueID;
}

export class Member extends AggregateRoot {
  constructor(
    _id: UniqueID,
    private readonly _username: UserName,
    private readonly _email: Email,
    private readonly _firstName: FirstName,
    private readonly _lastName: LastName,
  ) {
    super(_id);
  }

  get username(): UserName {
    return this._username;
  }

  get email(): Email {
    return this._email;
  }

  get firstName(): FirstName {
    return this._firstName;
  }

  get lastName(): LastName {
    return this._lastName;
  }

  get fullName(): string {
    return `${this.firstName.value} ${this.lastName.value}`;
  }

  static create(props: MemberProps): Result<Member> {
    const propsGuardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
    ]);

    if (!propsGuardResult.succeeded) {
      return Result.fail<Member>(new Error(propsGuardResult.message));
    }

    const userIdResult = Guard.againstNullOrUndefined(props.memberId, 'userId');

    const member = new Member(
      userIdResult.succeeded ? (props.memberId as UniqueID) : UniqueID.create(),
      props.username,
      props.email,
      props.firstName,
      props.lastName,
    );

    if (!userIdResult.succeeded) {
      member.addDomainEvent(new MemberCreated(member));
    }

    return Result.ok<Member>(member);
  }
}
