import { NotFoundException } from './Exceptions';

const Logger = use('Logger');

interface Mapping {
  [key: string]: any;
}

export default abstract class GenericMapper<Type> {
  protected abstract readonly mapping: Mapping;

  public transformValue(value: string, throwException: boolean = false): Type | undefined {
    const mappedValue = this.mapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    const errorMsg = this.getErrMessage(String(value));

    if (throwException) {
      throw new NotFoundException(errorMsg);
    }
    Logger.info(errorMsg);

    return undefined;
  }

  public reverseTransform(value: Type, throwException: boolean = false): string | undefined {
    const key = Object.keys(this.mapping).find(item => this.mapping[item] === value);

    if (key) {
      return key;
    }

    const errorMsg = this.getErrMessage(String(value), true);
    if (throwException) {
      throw new NotFoundException(errorMsg);
    }

    Logger.info(errorMsg);

    return undefined;
  }

  private getErrMessage(value: string, reverse: boolean = false): string {
    return `Missing${reverse ? ' reverse ' : ' '}mapping value in ${this.constructor.name} for ${value}.`;
  }
}
