import { CommentVote } from './comment-vote.entity';
import { WatchedList } from '../../../shared/watched-list.base';

export class CommentVotes extends WatchedList<CommentVote> {
  constructor(initialVotes: CommentVote[]) {
    super(initialVotes);
  }

  compareItems(a: CommentVote, b: CommentVote): boolean {
    return a.equals(b);
  }

  static create(initialVotes?: CommentVote[]): CommentVotes {
    return new CommentVotes(initialVotes ? initialVotes : []);
  }
}
