import { UniqueID } from '../../../shared/unique-id.base';
import { Post } from '../../entities/post/post.entity';

export interface PostRepoPort {
  savePost(post: Post): Promise<void>;
  deletePost(postId: UniqueID): Promise<void>;
  getPostById(postId: UniqueID): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
}
