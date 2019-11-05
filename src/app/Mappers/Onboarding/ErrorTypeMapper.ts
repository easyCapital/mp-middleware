import { ErrorType, ErrorTypes } from '@robinfinance/js-api';

const Logger = use('Logger');

enum ErrorTypeMapping {
  'default' = ErrorTypes.DEFAULT,
  'required' = ErrorTypes.REQUIRED,
  'min' = ErrorTypes.MIN,
  'max' = ErrorTypes.MAX,
}

export default class ErrorTypeMapper {
  public static transformValue(value: string): ErrorType | null {
    const mappedValue = ErrorTypeMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.warning('Missing mapping value in %s for %s', 'ErrorTypeMapper', value);

    return null;
  }
}
