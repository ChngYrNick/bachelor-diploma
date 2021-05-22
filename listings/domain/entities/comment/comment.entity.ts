import { Entity } from '../../../shared/entity.base';
import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { UniqueID } from '../../../shared/unique-id.base';
import { CommentText } from './comment-text.value';
import { CommentVotes } from './comment-votes.list';
import { CommentVote } from './comment-vote.entity';

interface CommentProps {
  commentId?: UniqueID;
  memberId: UniqueID;
  postId: UniqueID;
  text: CommentText;
  likes?: CommentVotes;
  parentComentId?: UniqueID;
}

export class Comment extends Entity {
  constructor(
    _id: UniqueID,
    private readonly _memberId: UniqueID,
    private readonly _postId: UniqueID,
    private readonly _text: CommentText,
    private readonly _likes: CommentVotes,
    private readonly _parentComentId?: UniqueID,
  ) {
    super(_id);
  }

  get memberId(): UniqueID {
    return this._memberId;
  }

  get postId(): UniqueID {
    return this._postId;
  }

  get parentComentId(): UniqueID | undefined {
    return this._parentComentId;
  }

  get text(): CommentText {
    return this._text;
  }

  get likes(): CommentVotes {
    return this._likes;
  }

  public removeVote(vote: CommentVote): Result<void> {
    this.likes.remove(vote);
    return Result.ok<void>();
  }

  public addVote(vote: CommentVote): Result<void> {
    this.likes.add(vote);
    return Result.ok<void>();
  }

  static create(props: CommentProps): Result<Comment> {
    const guardPropsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.text, argumentName: 'text' },
      { argument: props.postId, argumentName: 'postId' },
      { argument: props.memberId, argumentName: 'memberId' },
    ]);

    if (!guardPropsResult.succeeded) {
      return Result.fail<Comment>(new Error(guardPropsResult.message));
    }

    const guardLikesResult = Guard.againstNullOrUndefined(props.likes, 'likes');
    const guardIdResult = Guard.againstNullOrUndefined(
      props.commentId,
      'commentId',
    );

    return Result.ok<Comment>(
      new Comment(
        guardIdResult.succeeded
          ? (props.commentId as UniqueID)
          : UniqueID.create(),
        props.memberId,
        props.postId,
        props.text,
        guardLikesResult.succeeded
          ? (props.likes as CommentVotes)
          : CommentVotes.create([]),
        props.parentComentId,
      ),
    );
  }
}
