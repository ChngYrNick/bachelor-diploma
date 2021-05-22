import { PostVote } from './post-vote.entity';
import { WatchedList } from '../../../shared/watched-list.base';

export class PostVotes extends WatchedList<PostVote> {
  constructor(initialVotes: PostVote[]) {
    super(initialVotes);
  }

  compareItems(a: PostVote, b: PostVote): boolean {
    return a.equals(b);
  }

  static create(initialVotes?: PostVote[]): PostVotes {
    return new PostVotes(initialVotes ? initialVotes : []);
  }
}
