import { Post } from '../../../domain/entities/post/post.entity';
import { Result } from '../../../shared/core/result.base';
import { EditPostDTO } from '../../dtos/post/edit-post.dto';

export type EditPostResponse = Result<Post>;

export interface EditPostUseCase {
  editPost(dto: EditPostDTO): Promise<EditPostResponse>;
}
