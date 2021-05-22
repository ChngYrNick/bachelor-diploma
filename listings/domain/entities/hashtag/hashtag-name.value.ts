import { Guard } from '../../../shared/core/guard.base';
import { Result } from '../../../shared/core/result.base';
import { ValueObject } from '../../../shared/value-object.base';
import { ValidHashtagNameSpec } from '../../specifications/valid-hashtag-name.spec';

interface HashtagNameProps {
  name: string;
}

export class HashtagName extends ValueObject {
  constructor(private readonly _name: string) {
    super();
  }

  get value(): string {
    return this._name;
  }

  static create(props: HashtagNameProps): Result<HashtagName> {
    const guardResult = Guard.againstNullOrUndefined(props.name, 'name');

    if (!guardResult.succeeded) {
      return Result.fail<HashtagName>(new Error(guardResult.message));
    }

    const hashtagName = new HashtagName(props.name);
    const validHashtagNameSpec = new ValidHashtagNameSpec();

    if (!validHashtagNameSpec.isSatisfiedBy(hashtagName)) {
      return Result.fail<HashtagName>(new Error('hashtagName is not valid'));
    }

    return Result.ok<HashtagName>(hashtagName);
  }
}
