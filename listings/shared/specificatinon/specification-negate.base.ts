import { Specification, AbstractSpecification } from './internal';

export class NotSpecification<T> extends AbstractSpecification<T> {
  public constructor(private readonly _wrapped: Specification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return !this._wrapped.isSatisfiedBy(candidate);
  }
}
