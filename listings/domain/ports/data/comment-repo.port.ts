import { UniqueID } from '../../../shared/unique-id.base';
import { Comment } from '../../entities/comment/comment.entity';

export interface CommentRepoPort {
  saveComment(comment: Comment): Promise<void>;
  saveCommentBulk(comments: Comment[]): Promise<void>;
  deleteComment(commentId: UniqueID): Promise<void>;
  getCommentById(commentId: UniqueID): Promise<Comment>;
  getAllComments(): Promise<Comment[]>;
}
