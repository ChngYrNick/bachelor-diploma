import { Result } from '../../../shared/core/result.base';
import { LikeCommentDTO } from '../../dtos/comment/like-comment.dto';

export type LikeCommentResponse = Result<void>;

export interface LikeCommentUseCase {
  likeComment(dto: LikeCommentDTO): Promise<LikeCommentResponse>;
}
