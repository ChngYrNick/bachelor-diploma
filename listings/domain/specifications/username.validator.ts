import { Validator } from '../../shared/validator.base';
import { ShorterThanSpec } from './shorter-than.specif';
import { LongerThanSpec } from './longer-than.specif';
import { ContainsNumbersSpec } from './contains-numbers.specif';
import { Specification } from '../../shared/specificatinon/specification.base';
import { UserName } from '../entities/member/username.value';
import { IsCapitalUpperCaseSpec } from './is-capital-upper-case.specif';

export class UserNameValidator implements Validator<string> {
  public readonly errorMessage = 'Username is not valid';
  private readonly rules: Specification<string>[] = [
    new ShorterThanSpec(UserName.maxLength),
    new LongerThanSpec(UserName.minLength),
    new IsCapitalUpperCaseSpec(),
    new ContainsNumbersSpec(),
  ];

  public isValid(username: string): boolean {
    return this.brokenRules(username).length === 0;
  }

  public brokenRules(str: string): Array<string> {
    return this.rules
      .filter(rule => !rule.isSatisfiedBy(str))
      .map(rule => rule.constructor.name);
  }
}
