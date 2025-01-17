import { AbstractSpecification } from '../../shared/specificatinon';
import { Email } from '../entities/member/email.value';

export class ValidEmailSpec extends AbstractSpecification<Email> {
  public isSatisfiedBy(email: Email): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.value);
  }
}
