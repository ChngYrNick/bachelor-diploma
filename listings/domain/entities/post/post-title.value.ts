import { ValueObject } from '../../../shared/value-object.base';
import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { PostTitleValidator } from '../../specifications/post-title.validator';

export class PostTitle extends ValueObject {
  public static minLength = 2;
  public static maxLength = 85;

  constructor(private readonly _text: string) {
    super();
  }

  get value(): string {
    return this._text;
  }

  public static create(text: string): Result<PostTitle> {
    const guardResult = Guard.againstNullOrUndefined(text, 'text');

    if (!guardResult.succeeded) {
      return Result.fail<PostTitle>(new Error(guardResult.message));
    }

    const postTitleValidator = new PostTitleValidator();

    if (!postTitleValidator.isValid(text)) {
      return Result.fail<PostTitle>(new Error(postTitleValidator.errorMessage));
    }

    return Result.ok<PostTitle>(new PostTitle(text));
  }
}
