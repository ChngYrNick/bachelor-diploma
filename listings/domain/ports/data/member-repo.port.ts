import { UniqueID } from '../../../shared/unique-id.base';
import { Member } from '../../entities/member/member.entity';

export interface MemberRepoPort {
  saveMember(member: Member): Promise<void>;
  deleteMember(memberId: UniqueID): Promise<void>;
  getMemberById(memberId: UniqueID): Promise<Member>;
  getAllMembers(): Promise<Member[]>;
}
