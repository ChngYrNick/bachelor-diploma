import { Guard } from '../../../shared/core/guard.base';
import { Result } from '../../../shared/core/result.base';
import { Entity } from '../../../shared/entity.base';
import { UniqueID } from '../../../shared/unique-id.base';
import { HashtagName } from './hashtag-name.value';

interface HashtagProps {
  hashtagId?: UniqueID;
  hashtagName: HashtagName;
}

export class Hashtag extends Entity {
  constructor(_id: UniqueID, private readonly _hashtagName: HashtagName) {
    super(_id);
  }

  get name(): HashtagName {
    return this._hashtagName;
  }

  static create(props: HashtagProps): Result<Hashtag> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.hashtagName, argumentName: 'hashtagName' },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Hashtag>(new Error(propsResult.message));
    }

    const hashtagIdResult = Guard.againstNullOrUndefined(
      props.hashtagId,
      'hashtagId',
    );

    return Result.ok<Hashtag>(
      new Hashtag(
        hashtagIdResult.succeeded
          ? (props.hashtagId as UniqueID)
          : UniqueID.create(),
        props.hashtagName,
      ),
    );
  }
}
