import { Comment } from './comment.entity';
import { WatchedList } from '../../../shared/watched-list.base';

export class Comments extends WatchedList<Comment> {
  constructor(initialComments: Comment[]) {
    super(initialComments);
  }

  compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }

  static create(initialComments?: Comment[]): Comments {
    return new Comments(initialComments ? initialComments : []);
  }
}
