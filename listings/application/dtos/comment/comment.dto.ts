import { CommentVoteDTO } from './comment-vote.dto';

export interface CommentDTO {
  commentId: string;
  memberId: string;
  postId: string;
  text: string;
  commentVotes: CommentVoteDTO[];
  parentComentId?: string;
}
