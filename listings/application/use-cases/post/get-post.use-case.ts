import { Post } from '../../../domain/entities/post/post.entity';
import { Result } from '../../../shared/core/result.base';
import { GetPostDTO } from '../../dtos/post/get-post.dto';

export type GetPostResponse = Result<Post>;

export interface GetPostUseCase {
  getPost(dto: GetPostDTO): Promise<GetPostResponse>;
}
