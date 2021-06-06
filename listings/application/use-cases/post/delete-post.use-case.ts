import { Result } from '../../../shared/core/result.base';
import { DeletePostDTO } from '../../dtos/post/delete-post.dto';

export type DeletePostResponse = Result<void>;

export interface DeletePostUseCase {
  deletePost(dto: DeletePostDTO): Promise<DeletePostResponse>;
}
