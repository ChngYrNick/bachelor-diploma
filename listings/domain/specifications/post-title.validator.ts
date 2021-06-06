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
