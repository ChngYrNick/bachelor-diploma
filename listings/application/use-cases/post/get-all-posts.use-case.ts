import { Post } from '../../../domain/entities/post/post.entity';
import { Result } from '../../../shared/core/result.base';

export type GetAllPostsResponse = Result<Post[]>;

export interface GetAllPostsUseCase {
  getAllPosts(): Promise<GetAllPostsResponse>;
}
