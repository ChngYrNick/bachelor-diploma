import { Result } from '../../../shared/core/result.base';
import { LikePostDTO } from '../../dtos/post/like-post.dto';

export type LikePostResponse = Result<void>;

export interface LikePostUseCase {
  likePost(dto: LikePostDTO): Promise<LikePostResponse>;
}
