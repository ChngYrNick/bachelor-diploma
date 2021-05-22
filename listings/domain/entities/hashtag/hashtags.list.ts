import { Hashtag } from './hashtag.entity';
import { WatchedList } from '../../../shared/watched-list.base';

export class Hashtags extends WatchedList<Hashtag> {
  constructor(initialLikes: Hashtag[]) {
    super(initialLikes);
  }

  compareItems(a: Hashtag, b: Hashtag): boolean {
    return a.equals(b);
  }

  static create(initialLikes?: Hashtag[]): Hashtags {
    return new Hashtags(initialLikes ? initialLikes : []);
  }
}
