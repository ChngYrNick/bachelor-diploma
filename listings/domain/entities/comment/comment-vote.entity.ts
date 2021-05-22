import { Entity } from '../../../shared/entity.base';
import { UniqueID } from '../../../shared/unique-id.base';
import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';

export type VoteType = 'DISLIKE' | 'LIKE';

interface CommentVoteProps {
  commentId: UniqueID;
  memberId: UniqueID;
  commentVoteId?: UniqueID;
  voteType: VoteType;
}

export class CommentVote extends Entity {
  constructor(
    _id: UniqueID,
    private readonly _commentId: UniqueID,
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

  get commentId(): UniqueID {
    return this._commentId;
  }

  get memberId(): UniqueID {
    return this._memberId;
  }

  public isLike(): boolean {
    return this.type === CommentVote.LIKE;
  }

  public isDislike(): boolean {
    return this.type === CommentVote.DISLIKE;
  }

  static create(props: CommentVoteProps): Result<CommentVote> {
    const guardPropsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.commentId, argumentName: 'commentId' },
      { argument: props.voteType, argumentName: 'voteType' },
    ]);

    if (!guardPropsResult.succeeded) {
      return Result.fail<CommentVote>(new Error(guardPropsResult.message));
    }

    const commentVoteIdResult = Guard.againstNullOrUndefined(
      props.commentVoteId,
      'commentVoteId',
    );

    return Result.ok<CommentVote>(
      new CommentVote(
        commentVoteIdResult.succeeded
          ? (props.commentVoteId as UniqueID)
          : UniqueID.create(),
        props.commentId,
        props.memberId,
        props.voteType,
      ),
    );
  }
}
