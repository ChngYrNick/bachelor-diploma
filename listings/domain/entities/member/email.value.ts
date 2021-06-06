import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';
import { ValidEmailSpec } from '../../specifications/valid-email.specif';

export class Email extends ValueObject {
  private constructor(private readonly _value: string) {
    super();
  }

  get value(): string {
    return this._value;
  }

  public static create(value: string): Result<Email> {
    const guardResult = Guard.againstNullOrUndefined(value, 'email');

    if (!guardResult.succeeded) {
      return Result.fail<Email>(new Error(guardResult.message));
    }

    const validEmailSpec = new ValidEmailSpec();

    const email = new Email(value);

    if (!validEmailSpec.isSatisfiedBy(email)) {
      return Result.fail<Email>(new Error('Email is not valid'));
    }

    return Result.ok<Email>(email);
  }
}
