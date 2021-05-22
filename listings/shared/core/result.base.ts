export class Result<T> {
  public constructor(
    private readonly _isSuccess: boolean,
    private readonly _error: Error | null,
    private readonly _value?: T,
  ) {}

  get errorValue(): Error | null {
    return this._error;
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this.isSuccess;
  }

  get value(): T | undefined {
    if (this.isFailure) {
      throw new Error("Can't get the value of an error result.");
    }
    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    const result = new Result<U>(true, null, value);
    Object.freeze(result);
    return result;
  }

  public static fail<U>(error: Error): Result<U> {
    const result = new Result<U>(false, error);
    Object.freeze(result);
    return result;
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
