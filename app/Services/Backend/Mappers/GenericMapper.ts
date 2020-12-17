import Logger from '@ioc:Adonis/Core/Logger';

import { NotFoundException } from 'App/Exceptions';

interface Mapping {
  [key: string]: any;
}

export default abstract class GenericMapper<Type> {
  protected abstract readonly mapping: Mapping;

  public transformValue(value: string, throwException: boolean = false): Type | undefined {
    const mappedValue = this.mapping[value];

    if (mappedValue !== undefined) {
      return mappedValue;
    }

    const errorMessage = this.getErrorMessage(String(value));

    if (throwException) {
      throw new NotFoundException(errorMessage);
    }

    Logger.info(errorMessage);

    return undefined;
  }

  public reverseTransform(value: Type, throwException: boolean = false): string | undefined {
    const key = Object.keys(this.mapping).find((item) => this.mapping[item] === value);

    if (key) {
      return key;
    }

    const errorMessage = this.getErrorMessage(String(value), true);

    if (throwException) {
      throw new NotFoundException(errorMessage);
    }

    Logger.info(errorMessage);

    return undefined;
  }

  private getErrorMessage(value: string, reverse: boolean = false): string {
    return `Missing${reverse ? ' reverse ' : ' '}mapping value in ${
      this.constructor.name
    } for ${value}.`;
  }
}
