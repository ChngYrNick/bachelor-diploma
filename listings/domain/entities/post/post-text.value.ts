import { ValueObject } from '../../../shared/value-object.base';
import { Result } from '../../../shared/core/result.base';

export class PostText extends ValueObject {
  constructor(private readonly _text: string) {
    super();
  }

  get value(): string {
    return this._text;
  }

  public static create(text: string): Result<PostText> {
    return Result.ok<PostText>(new PostText(text));
  }
}
