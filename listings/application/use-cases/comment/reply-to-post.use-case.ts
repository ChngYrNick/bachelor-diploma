import { Comment } from '../../../domain/entities/comment/comment.entity';
import { Result } from '../../../shared/core/result.base';
import { ReplyToPostDTO } from '../../dtos/comment/reply-to-post.dto';

export type ReplyToPostResponse = Result<Comment>;

export interface ReplyToPostUseCase {
  replyToPost(dto: ReplyToPostDTO): Promise<ReplyToPostResponse>;
}
