import { AggregateRoot } from '../../../shared/aggregate-root.base';
import { Guard } from '../../../shared/core/guard.base';
import { Result } from '../../../shared/core/result.base';
import { UniqueID } from '../../../shared/unique-id.base';
import { PostCreated } from '../../events/post-created.event';
import { Comments } from '../comment/comments.list';
import { Hashtags } from '../hashtag/hashtags.list';
import { PostVotes } from './post-votes.list';
import { PostText } from './post-text.value';
import { PostTitle } from './post-title.value';
import { Comment } from '../comment/comment.entity';
import { CommentPosted } from '../../events/comment-posted.event';
import { PostViewed } from '../../events/post-viewed.event';
import { PostEdited } from '../../events/post-edited.event';
import { PostVote } from './post-vote.entity';

export interface PostProps {
  postId?: UniqueID;
  memberId: UniqueID;
  postTitle: PostTitle;
  postText: PostText;
  postLikes?: PostVotes;
  comments?: Comments;
  hashtags?: Hashtags;
  datePosted?: Date;
  dateModified?: Date;
}

export interface EditPostProps {
  postTitle: PostTitle;
  postText: PostText;
  hashtags: Hashtags;
}

export class Post extends AggregateRoot {
  constructor(
    _id: UniqueID,
    private _postTitle: PostTitle,
    private _postText: PostText,
    private _hashtags: Hashtags,
    private readonly _memberId: UniqueID,
    private readonly _postLikes: PostVotes,
    private readonly _comments: Comments,
    private readonly _datePosted: Date,
    private _dateModified: Date,
  ) {
    super(_id);
  }

  get memberId(): UniqueID {
    return this._memberId;
  }

  get title(): PostTitle {
    return this._postTitle;
  }

  private updateTitle(title: PostTitle): Result<void> {
    this._postTitle = title;
    return Result.ok<void>();
  }

  get text(): PostText {
    return this._postText;
  }

  private updateText(text: PostText): Result<void> {
    this._postText = text;
    return Result.ok<void>();
  }

  get likes(): PostVotes {
    return this._postLikes;
  }

  get comments(): Comments {
    return this._comments;
  }

  get hashtags(): Hashtags {
    return this._hashtags;
  }

  private updateHashtags(hashtags: Hashtags): Result<void> {
    this._hashtags = hashtags;
    return Result.ok<void>();
  }

  private postModified(): Result<void> {
    this._dateModified = new Date();
    return Result.ok<void>();
  }

  get datePosted(): Date {
    return this._datePosted;
  }

  get dateModified(): Date {
    return this._dateModified;
  }

  public getViewed(): Result<void> {
    this.addDomainEvent(new PostViewed(this));
    return Result.ok<void>();
  }

  public getComment(comment: Comment): Result<void> {
    this.comments.add(comment);
    this.addDomainEvent(new CommentPosted(comment));
    return Result.ok<void>();
  }

  public removeVote(vote: PostVote): Result<void> {
    this.likes.remove(vote);
    return Result.ok<void>();
  }

  public addVote(vote: PostVote): Result<void> {
    this.likes.add(vote);
    return Result.ok<void>();
  }

  public updateInfo(props: EditPostProps): Result<void> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.postTitle, argumentName: 'postTitle' },
      { argument: props.postText, argumentName: 'postText' },
      { argument: props.hashtags, argumentName: 'hashtags' },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<void>(new Error(propsResult.message));
    }

    const previousPostState = Object.assign({}, this);

    this.updateTitle(props.postTitle);
    this.updateText(props.postText);
    this.updateHashtags(props.hashtags);

    this.postModified();

    this.addDomainEvent(new PostEdited(previousPostState, this));

    return Result.ok<void>();
  }

  private removeCommentIfExists(comment: Comment): Result<void> {
    if (this.comments.exists(comment)) {
      this.comments.remove(comment);
    }

    return Result.ok<void>();
  }

  public updateComment(comment: Comment): Result<void> {
    this.removeCommentIfExists(comment);
    this.comments.add(comment);
    return Result.ok<void>();
  }

  static create(props: PostProps): Result<Post> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.postTitle, argumentName: 'postTitle' },
      { argument: props.postText, argumentName: 'postText' },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Post>(new Error(propsResult.message));
    }

    const postIdResult = Guard.againstNullOrUndefined(props.postId, 'postId');
    const postLikesResult = Guard.againstNullOrUndefined(
      props.postLikes,
      'postLikes',
    );
    const commentsResult = Guard.againstNullOrUndefined(
      props.comments,
      'comments',
    );
    const hashtagsResult = Guard.againstNullOrUndefined(
      props.hashtags,
      'hashtags',
    );
    const datePostedResult = Guard.againstNullOrUndefined(
      props.datePosted,
      'datePosted',
    );
    const dateModifiedResult = Guard.againstNullOrUndefined(
      props.dateModified,
      'dateModified',
    );

    const post = new Post(
      postIdResult.succeeded ? (props.postId as UniqueID) : UniqueID.create(),
      props.postTitle,
      props.postText,
      hashtagsResult.succeeded
        ? (props.hashtags as Hashtags)
        : Hashtags.create([]),
      props.memberId,
      postLikesResult.succeeded
        ? (props.postLikes as PostVotes)
        : PostVotes.create([]),
      commentsResult.succeeded
        ? (props.comments as Comments)
        : Comments.create([]),
      datePostedResult.succeeded ? (props.datePosted as Date) : new Date(),
      dateModifiedResult.succeeded ? (props.dateModified as Date) : new Date(),
    );

    if (!postIdResult.succeeded) {
      post.addDomainEvent(new PostCreated(post));
    }

    return Result.ok<Post>(post);
  }
}
