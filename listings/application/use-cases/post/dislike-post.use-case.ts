import { Result } from '../../../shared/core/result.base';
import { DislikePostDTO } from '../../dtos/post/dislike-post.dto';

export type DislikePostResponse = Result<void>;

export interface DislikePostUseCase {
  dislikePost(dto: DislikePostDTO): Promise<DislikePostResponse>;
}
