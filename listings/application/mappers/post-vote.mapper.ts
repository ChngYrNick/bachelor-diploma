import {
  PostVote,
  VoteType,
} from '../../domain/entities/post/post-vote.entity';
import { Mapper } from '../../shared/mapper.base';
import { UniqueID } from '../../shared/unique-id.base';
import { PostVoteDTO } from '../dtos/post/post-vote.dto';

export class PostVoteMapper implements Mapper<PostVoteDTO, PostVote> {
  public toDomain(dto: PostVoteDTO): PostVote {
    return PostVote.create({
      postVoteId: UniqueID.create(dto.postVoteId),
      memberId: UniqueID.create(dto.memberId),
      postId: UniqueID.create(dto.postId),
      voteType: dto.voteType as VoteType,
    }).value as PostVote;
  }

  public toPersistence(domain: PostVote): PostVoteDTO {
    return {
      postVoteId: domain.id.value,
      postId: domain.postId.value,
      memberId: domain.memberId.value,
      voteType: domain.type,
    };
  }
}
