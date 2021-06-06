import {
  CommentVote,
  VoteType,
} from '../../domain/entities/comment/comment-vote.entity';
import { Mapper } from '../../shared/mapper.base';
import { UniqueID } from '../../shared/unique-id.base';
import { CommentVoteDTO } from '../dtos/comment/comment-vote.dto';

export class CommentVoteMapper implements Mapper<CommentVoteDTO, CommentVote> {
  public toDomain(dto: CommentVoteDTO): CommentVote {
    return CommentVote.create({
      commentVoteId: UniqueID.create(dto.commentVoteId),
      memberId: UniqueID.create(dto.memberId),
      commentId: UniqueID.create(dto.commentId),
      voteType: dto.voteType as VoteType,
    }).value as CommentVote;
  }

  public toPersistence(domain: CommentVote): CommentVoteDTO {
    return {
      commentVoteId: domain.id.value,
      commentId: domain.commentId.value,
      memberId: domain.memberId.value,
      voteType: domain.type,
    };
  }
}
