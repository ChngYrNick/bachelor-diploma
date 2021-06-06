import { Comment } from '../../../domain/entities/comment/comment.entity';
import { Result } from '../../../shared/core/result.base';
import { GetPostCommentsDTO } from '../../dtos/comment/get-post-comments.dto';

export type GetPostCommentsResponse = Result<Comment[]>;

export interface GetPostCommentsUseCase {
  getPostComments(dto: GetPostCommentsDTO): Promise<GetPostCommentsResponse>;
}
