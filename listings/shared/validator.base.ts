export interface Validator<T> {
  errorMessage: string;
  isValid(entity: T): boolean;
  brokenRules(entity: T): Array<string>;
}
