import { Result } from '../../shared/core/result.base';
import { CommentVote } from '../entities/comment/comment-vote.entity';
import { Comment } from '../entities/comment/comment.entity';
import { Member } from '../entities/member/member.entity';
import { PostVote } from '../entities/post/post-vote.entity';
import { Post } from '../entities/post/post.entity';

export class BlogService {
  public dislikeComment(
    post: Post,
    member: Member,
    comment: Comment,
    commentVotesByMember: CommentVote[],
  ) {
    const existingDislike: CommentVote | undefined = commentVotesByMember.find(
      (vote: CommentVote) => {
        return vote.isDislike();
      },
    );

    const dislikeAlreadyExists = !!existingDislike;
    if (dislikeAlreadyExists) {
      comment.removeVote(existingDislike as CommentVote);
      post.updateComment(comment);
      return Result.ok<void>();
    }

    const existingLike: CommentVote | undefined = commentVotesByMember.find(
      (vote: CommentVote) => {
        return vote.isLike();
      },
    );

    const likeAlreadyExists = !!existingLike;
    if (likeAlreadyExists) {
      comment.removeVote(existingLike as CommentVote);
      post.updateComment(comment);
    }

    const dislikeOrError: Result<CommentVote> = CommentVote.create({
      commentId: comment.id,
      memberId: member.id,
      voteType: CommentVote.DISLIKE,
    });

    if (dislikeOrError.isFailure) {
      return Result.fail<void>(dislikeOrError.errorValue as Error);
    }

    const dislike: CommentVote = dislikeOrError.value as CommentVote;
    comment.addVote(dislike);
    post.updateComment(comment);
    return Result.ok<void>();
  }

  public likeComment(
    post: Post,
    member: Member,
    comment: Comment,
    commentVotesByMember: CommentVote[],
  ) {
    const existingLike: CommentVote | undefined = commentVotesByMember.find(
      (vote: CommentVote) => {
        return vote.isLike();
      },
    );

    const likeAlreadyExists = !!existingLike;
    if (likeAlreadyExists) {
      comment.removeVote(existingLike as CommentVote);
      post.updateComment(comment);
      return Result.ok<void>();
    }

    const existingDislike: CommentVote | undefined = commentVotesByMember.find(
      (vote: CommentVote) => {
        return vote.isDislike();
      },
    );

    const dislikeAlreadyExists = !!existingDislike;
    if (dislikeAlreadyExists) {
      comment.removeVote(existingDislike as CommentVote);
      post.updateComment(comment);
    }

    const likeOrError: Result<CommentVote> = CommentVote.create({
      commentId: comment.id,
      memberId: member.id,
      voteType: CommentVote.LIKE,
    });

    if (likeOrError.isFailure) {
      return Result.fail<void>(likeOrError.errorValue as Error);
    }

    const like: CommentVote = likeOrError.value as CommentVote;
    comment.addVote(like);
    post.updateComment(comment);
    return Result.ok<void>();
  }

  public dislikePost(
    post: Post,
    member: Member,
    postVotesByMember: PostVote[],
  ): Result<void> {
    const existingDislike: PostVote | undefined = postVotesByMember.find(
      (vote: PostVote) => {
        return vote.isDislike();
      },
    );

    const dislikeAlreadyExists = !!existingDislike;

    if (dislikeAlreadyExists) {
      post.removeVote(existingDislike as PostVote);
      return Result.ok<void>();
    }

    const existingLike: PostVote | undefined = postVotesByMember.find(
      (vote: PostVote) => {
        return vote.isLike();
      },
    );

    const likeAlreadyExists = !!existingLike;

    if (likeAlreadyExists) {
      post.removeVote(existingLike as PostVote);
    }

    const dislikeOrError: Result<PostVote> = PostVote.create({
      postId: post.id,
      memberId: member.id,
      voteType: PostVote.DISLIKE,
    });

    if (dislikeOrError.isFailure) {
      return Result.fail<void>(dislikeOrError.errorValue as Error);
    }

    const dislike: PostVote = dislikeOrError.value as PostVote;

    post.addVote(dislike);

    return Result.ok<void>();
  }

  public likePost(
    post: Post,
    member: Member,
    postVotesByMember: PostVote[],
  ): Result<void> {
    const existingLike: PostVote | undefined = postVotesByMember.find(
      (vote: PostVote) => {
        return vote.isLike();
      },
    );

    const likeAlreadyExists = !!existingLike;

    if (likeAlreadyExists) {
      post.removeVote(existingLike as PostVote);
      return Result.ok<void>();
    }

    const existingDislike: PostVote | undefined = postVotesByMember.find(
      (vote: PostVote) => {
        return vote.isDislike();
      },
    );

    const dislikeAlreadyExists = !!existingDislike;

    if (dislikeAlreadyExists) {
      post.removeVote(existingDislike as PostVote);
    }

    const likeOrError: Result<PostVote> = PostVote.create({
      postId: post.id,
      memberId: member.id,
      voteType: PostVote.LIKE,
    });

    if (likeOrError.isFailure) {
      return Result.fail<void>(likeOrError.errorValue as Error);
    }

    const like: PostVote = likeOrError.value as PostVote;

    post.addVote(like);

    return Result.ok<void>();
  }
}
