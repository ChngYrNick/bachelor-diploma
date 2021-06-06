import { CommentDTO } from '../comment/comment.dto';
import { PostVoteDTO } from './post-vote.dto';

export interface PostDTO {
  postId: string;
  memberId: string;
  postTitle: string;
  postText: string;
  postLikes: PostVoteDTO[];
  comments: CommentDTO[];
  datePosted: Date;
  dateModified: Date;
}
