import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';
import { LongerThanSpec } from '../../specifications/longer-than.specif';
import { ShorterThanSpec } from '../../specifications/shorter-than.specif';
import { IsCapitalUpperCaseSpec } from '../../specifications/is-capital-upper-case.specif';

export class LastName extends ValueObject {
  public static maxLength = 15;
  public static minLength = 2;

  private constructor(private readonly _value: string) {
    super();
  }

  get value(): string {
    return this._value;
  }

  public static create(name: string): Result<LastName> {
    const nameResult = Guard.againstNullOrUndefined(name, 'username');

    const validNameSpec = new LongerThanSpec(this.minLength)
      .and(new ShorterThanSpec(this.maxLength))
      .and(new IsCapitalUpperCaseSpec());

    if (!validNameSpec.isSatisfiedBy(name)) {
      return Result.fail<LastName>(new Error('Last name is not valid'));
    }

    if (!nameResult.succeeded) {
      return Result.fail<LastName>(new Error(nameResult.message));
    }

    return Result.ok<LastName>(new LastName(name));
  }
}
