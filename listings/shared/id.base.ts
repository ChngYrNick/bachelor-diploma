export class Identifier<T> {
  constructor(private readonly _value: T) {}

  equals(id: Identifier<T>): boolean {
    return id.value === this.value;
  }

  toString(): string {
    return String(this.value);
  }

  get value(): T {
    return this._value;
  }
}
