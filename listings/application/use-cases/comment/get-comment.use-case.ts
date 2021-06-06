import { Comment } from '../../../domain/entities/comment/comment.entity';
import { Result } from '../../../shared/core/result.base';
import { GetCommentDTO } from '../../dtos/comment/get-comment.dto';

export type GetCommentResponse = Result<Comment>;

export interface GetCommentUseCase {
  getComment(dto: GetCommentDTO): Promise<GetCommentResponse>;
}
