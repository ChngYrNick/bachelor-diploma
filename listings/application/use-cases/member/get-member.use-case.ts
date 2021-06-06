import { Member } from '../../../domain/entities/member/member.entity';
import { Result } from '../../../shared/core/result.base';
import { GetMemberDTO } from '../../dtos/member/get-member.dto';

export type GetMemberResponse = Result<Member>;

export interface GetMemberUseCase {
  getMember(dto: GetMemberDTO): Promise<GetMemberResponse>;
}
