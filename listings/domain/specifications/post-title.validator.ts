import { Validator } from '../../shared/validator.base';
import { PostTitle } from '../entities/post/post-title.value';
import { ShorterThanSpec } from './shorter-than.spec';
import { LongerThanSpec } from './longer-than.spec';
import { Specification } from '../../shared/specificatinon/specification.base';

export class PostTitleValidator implements Validator<string> {
  public readonly errorMessage = 'Post title is not valid';
  private readonly rules: Specification<string>[] = [
    new ShorterThanSpec(PostTitle.maxLength),
    new LongerThanSpec(PostTitle.minLength),
  ];

  public isValid(postTitle: string): boolean {
    return this.brokenRules(postTitle).length === 0;
  }

  public brokenRules(str: string): Array<string> {
    return this.rules
      .filter(rule => !rule.isSatisfiedBy(str))
      .map(rule => rule.constructor.name);
  }
}
