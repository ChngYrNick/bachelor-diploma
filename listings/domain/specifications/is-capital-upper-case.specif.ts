import { AbstractSpecification } from '../../shared/specificatinon';

export class IsCapitalUpperCaseSpec extends AbstractSpecification<string> {
  isSatisfiedBy(str: string): boolean {
    return str[0] === str[0].toUpperCase();
  }
}
