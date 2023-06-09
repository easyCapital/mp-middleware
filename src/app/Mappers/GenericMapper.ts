import { NotFoundException } from './Exceptions';

const Config = use('Config');
const Logger = use('Logger');

interface Mapping {
  [key: string]: any;
}

export default abstract class GenericMapper<Type> {
  protected abstract readonly mapping: Mapping;

  public transformValue(value: string, throwException = false): Type | undefined {
    const environment = Config.get('sentry.environment');
    const mappedValue = this.mapping[value];

    if (mappedValue !== undefined) {
      return mappedValue;
    }

    const errorMessage = this.getErrorMessage(String(value));

    if (throwException) {
      throw new NotFoundException(errorMessage);
    }

    if (environment === 'staging' || environment === 'production') {
      const Sentry = use('Sentry');

      Sentry.captureMessage(errorMessage);
    }

    Logger.info(errorMessage);

    return undefined;
  }

  public reverseTransform(value: Type, throwException = false): string | undefined {
    const environment = Config.get('sentry.environment');
    const key = Object.keys(this.mapping).find((item) => this.mapping[item] === value);

    if (key) {
      return key;
    }

    const errorMessage = this.getErrorMessage(String(value), true);

    if (throwException) {
      throw new NotFoundException(errorMessage);
    }

    if (environment === 'staging' || environment === 'production') {
      const Sentry = use('Sentry');

      Sentry.captureMessage(errorMessage);
    }

    Logger.info(errorMessage);

    return undefined;
  }

  private getErrorMessage(value: string, reverse = false): string {
    return `Missing${reverse ? ' reverse ' : ' '}mapping value in ${this.constructor.name} for ${value}.`;
  }
}
