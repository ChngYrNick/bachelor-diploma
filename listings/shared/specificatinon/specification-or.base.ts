import { Specification, AbstractSpecification } from './internal';

export class OrSpecification<T> extends AbstractSpecification<T> {
  public constructor(
    private readonly _left: Specification<T>,
    private readonly _right: Specification<T>,
  ) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return (
      this._left.isSatisfiedBy(candidate) ||
      this._right.isSatisfiedBy(candidate)
    );
  }
}
