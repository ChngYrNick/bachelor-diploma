import { Entity } from '../../../shared/entity.base';
import { UniqueID } from '../../../shared/unique-id.base';
import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';

export type VoteType = 'DISLIKE' | 'LIKE';

interface PostVoteProps {
  postId: UniqueID;
  memberId: UniqueID;
  postVoteId?: UniqueID;
  voteType: VoteType;
}

export class PostVote extends Entity {
  constructor(
    _id: UniqueID,
    private readonly _postId: UniqueID,
    private readonly _memberId: UniqueID,
    private readonly _type: VoteType,
  ) {
    super(_id);
  }

  static get DISLIKE(): VoteType {
    return 'DISLIKE';
  }

  static get LIKE(): VoteType {
    return 'LIKE';
  }

  get type(): VoteType {
    return this._type;
  }

  get postId(): UniqueID {
    return this._postId;
  }

  get memberId(): UniqueID {
    return this._memberId;
  }

  public isLike(): boolean {
    return this.type === PostVote.LIKE;
  }

  public isDislike(): boolean {
    return this.type === PostVote.DISLIKE;
  }

  static create(props: PostVoteProps): Result<PostVote> {
    const guardPropsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.postId, argumentName: 'postId' },
      { argument: props.voteType, argumentName: 'voteType' },
    ]);

    if (!guardPropsResult.succeeded) {
      return Result.fail<PostVote>(new Error(guardPropsResult.message));
    }

    const postVoteIdResult = Guard.againstNullOrUndefined(
      props.postVoteId,
      'postVoteId',
    );

    return Result.ok<PostVote>(
      new PostVote(
        postVoteIdResult.succeeded
          ? (props.postVoteId as UniqueID)
          : UniqueID.create(),
        props.postId,
        props.memberId,
        props.voteType,
      ),
    );
  }
}
