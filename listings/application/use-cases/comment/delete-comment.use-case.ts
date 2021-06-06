import { Result } from '../../../shared/core/result.base';
import { DeleteCommentDTO } from '../../dtos/comment/delete-comment.dto';

export type DeleteCommentResponse = Result<void>;

export interface DeleteCommentUseCase {
  deleteComment(dto: DeleteCommentDTO): Promise<DeleteCommentResponse>;
}
