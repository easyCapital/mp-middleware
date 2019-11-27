const Logger = use('Logger');

interface Mapping {
  [key: string]: any;
}

export default abstract class GenericMapper<Type> {
  protected abstract readonly mapping: Mapping;

  public transformValue(value: string): Type | undefined {
    const mappedValue = this.mapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', this.constructor.name, String(value));

    return undefined;
  }

  public reverseTransform(value: Type): string | undefined {
    const key = Object.keys(this.mapping).find(item => this.mapping[item] === value);

    if (key) {
      return key;
    }

    Logger.info('Missing reverse mapping value in %s for %s', this.constructor.name, String(value));

    return undefined;
  }
}
