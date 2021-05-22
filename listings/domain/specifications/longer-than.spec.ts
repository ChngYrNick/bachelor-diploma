import { AbstractSpecification } from '../../shared/specificatinon';

export class LongerThanSpec extends AbstractSpecification<string> {
  constructor(private readonly _length: number) {
    super();
  }

  isSatisfiedBy(str: string): boolean {
    return str.length > this._length;
  }
}
