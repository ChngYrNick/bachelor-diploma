import { Post } from '../../../domain/entities/post/post.entity';
import { Result } from '../../../shared/core/result.base';
import { CreateMemberDTO } from '../../dtos/member/create-member.dto';

export type CreateMemberResponse = Result<Post>;

export interface CreateMemberUseCase {
  createMember(dto: CreateMemberDTO): Promise<CreateMemberResponse>;
}
