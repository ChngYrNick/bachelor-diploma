import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';

export class FirstName extends ValueObject {
  public static maxLength = 15;
  public static minLength = 2;

  private constructor(private readonly _value: string) {
    super();
  }

  get value(): string {
    return this._value;
  }

  public static create(name: string): Result<FirstName> {
    const usernameResult = Guard.againstNullOrUndefined(name, 'username');
    const minLengthResult = Guard.againstAtLeast(this.minLength, name);
    const maxLengthResult = Guard.againstAtMost(this.maxLength, name);

    if (!usernameResult.succeeded) {
      return Result.fail<FirstName>(new Error(usernameResult.message));
    }

    if (!minLengthResult.succeeded) {
      return Result.fail<FirstName>(new Error(minLengthResult.message));
    }

    if (!maxLengthResult.succeeded) {
      return Result.fail<FirstName>(new Error(maxLengthResult.message));
    }

    return Result.ok<FirstName>(new FirstName(name));
  }
}
