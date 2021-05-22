import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';

export class UserName extends ValueObject {
  public static maxLength = 15;
  public static minLength = 2;

  private constructor(private readonly _value: string) {
    super();
  }

  get value(): string {
    return this._value;
  }

  public static create(username: string): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(username, 'username');
    const minLengthResult = Guard.againstAtLeast(this.minLength, username);
    const maxLengthResult = Guard.againstAtMost(this.maxLength, username);

    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(new Error(usernameResult.message));
    }

    if (!minLengthResult.succeeded) {
      return Result.fail<UserName>(new Error(minLengthResult.message));
    }

    if (!maxLengthResult.succeeded) {
      return Result.fail<UserName>(new Error(maxLengthResult.message));
    }

    return Result.ok<UserName>(new UserName(username));
  }
}
