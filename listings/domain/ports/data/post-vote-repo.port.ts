import { UniqueID } from '../../../shared/unique-id.base';
import { PostVote, VoteType } from '../../entities/post/post-vote.entity';
import { PostVotes } from '../../entities/post/post-votes.list';

export interface PostVoteRepo {
  delete(vote: PostVote): Promise<void>;
  save(vote: PostVote): Promise<void>;
  saveBulk(votes: PostVotes): Promise<void>;
  exists(
    postId: UniqueID,
    memberId: UniqueID,
    voteType: VoteType,
  ): Promise<boolean>;
  getPostVotesByMemberId(
    postId: UniqueID,
    memberId: UniqueID,
  ): Promise<PostVote[]>;
}
