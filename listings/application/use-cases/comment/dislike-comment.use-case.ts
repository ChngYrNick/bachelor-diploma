import { Result } from '../../../shared/core/result.base';
import { DislikeCommentDTO } from '../../dtos/comment/dislike-comment.dto';

export type DislikeCommentResponse = Result<void>;

export interface DislikeCommentUseCase {
  dislikeComment(dto: DislikeCommentDTO): Promise<DislikeCommentResponse>;
}
