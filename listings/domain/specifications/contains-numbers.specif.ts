import { AbstractSpecification } from '../../shared/specificatinon';

export class ContainsNumbersSpec extends AbstractSpecification<string> {
  isSatisfiedBy(str: string): boolean {
    return /\d/.test(str);
  }
}
