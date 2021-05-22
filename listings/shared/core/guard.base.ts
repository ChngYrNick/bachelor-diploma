/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GuardResult {
  succeeded: boolean;
  message: string;
}

export interface GuardArgument {
  argument: any;
  argumentName: string;
}

export class Guard {
  public static combine(guardResults: GuardResult[]): GuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true, message: '' };
  }

  public static againstNullOrUndefinedBulk(args: GuardArgument[]): GuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true, message: '' };
  }

  public static greaterThan(
    minValue: number,
    actualValue: number,
  ): GuardResult {
    return actualValue > minValue
      ? { succeeded: true, message: '' }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  public static againstAtLeast(numChars: number, text: string): GuardResult {
    return text.length >= numChars
      ? { succeeded: true, message: '' }
      : {
          succeeded: false,
          message: `Text is not at least ${numChars} chars.`,
        };
  }

  public static againstAtMost(numChars: number, text: string): GuardResult {
    return text.length <= numChars
      ? { succeeded: true, message: '' }
      : {
          succeeded: false,
          message: `Text is greater than ${numChars} chars.`,
        };
  }

  public static againstNullOrUndefined<T>(
    argument: T | null | undefined,
    argumentName: string,
  ): GuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    } else {
      return { succeeded: true, message: '' };
    }
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string,
  ): GuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    } else {
      return { succeeded: true, message: '' };
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): GuardResult {
    let failingResult = null;
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    } else {
      return { succeeded: true, message: '' };
    }
  }
}
