import { Comment } from '../../../domain/entities/comment/comment.entity';
import { Result } from '../../../shared/core/result.base';
import { EditCommentDTO } from '../../dtos/comment/edit-comment.dto';

export type EditCommentResponse = Result<Comment>;

export interface EditCommentUseCase {
  editComment(dto: EditCommentDTO): Promise<EditCommentResponse>;
}
