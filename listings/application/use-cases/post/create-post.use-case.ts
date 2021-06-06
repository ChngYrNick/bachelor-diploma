import { Post } from '../../../domain/entities/post/post.entity';
import { Result } from '../../../shared/core/result.base';
import { CreatePostDTO } from '../../dtos/post/create-post.dto';

export type CreatePostResponse = Result<Post>;

export interface CreatePostUseCase {
  createPost(dto: CreatePostDTO): Promise<CreatePostResponse>;
}
