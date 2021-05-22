import { AbstractSpecification } from '../../shared/specificatinon';
import { HashtagName } from '../entities/hashtag/hashtag-name.value';

export class ValidHashtagNameSpec extends AbstractSpecification<HashtagName> {
  public isSatisfiedBy(hashtagName: HashtagName): boolean {
    const re = /^#[^ !@#$%^&*(),.?":{}|<>]*$/;

    return re.test(hashtagName.value);
  }
}
