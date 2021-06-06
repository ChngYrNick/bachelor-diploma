import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';
import { UserNameValidator } from '../../specifications/username.validator';

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

    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(new Error(usernameResult.message));
    }

    const userNameValidator = new UserNameValidator();

    if (!userNameValidator.isValid(username)) {
      return Result.fail<UserName>(new Error(userNameValidator.errorMessage));
    }

    return Result.ok<UserName>(new UserName(username));
  }
}
