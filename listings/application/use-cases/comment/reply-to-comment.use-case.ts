import { Comment } from '../../../domain/entities/comment/comment.entity';
import { Result } from '../../../shared/core/result.base';
import { ReplyToCommentDTO } from '../../dtos/comment/reply-to-comment.dto';

export type ReplyToCommentResponse = Result<Comment>;

export interface ReplyToCommentUseCase {
  replyToComment(dto: ReplyToCommentDTO): Promise<ReplyToCommentResponse>;
}
