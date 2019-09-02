import { ErrorType, ErrorTypes } from 'mieuxplacer-js-api';

const Logger = use('Logger');

enum ErrorTypeMapping {
  'empty' = ErrorTypes.EMPTY,
  'invalid' = ErrorTypes.INVALID,
  'min_value' = ErrorTypes.MIN_VALUE,
  'max_value' = ErrorTypes.MAX_VALUE,
  'email_used' = ErrorTypes.EMAIL_USED,
  'fake_email' = ErrorTypes.FAKE_EMAIL,
  'password_too_short' = ErrorTypes.PASSWORD_TOO_SHORT,
  'password_too_common' = ErrorTypes.PASSWORD_TOO_COMMON,
  'password_only_numeric' = ErrorTypes.PASSWORD_ONLY_NUMERIC,
  'password_too_similar_to_email' = ErrorTypes.PASSWORD_TOO_SIMILAR_TO_EMAIL,
  'phone_not_mobile' = ErrorTypes.PHONE_NOT_MOBILE,
}

export default class ErrorTypeMapper {
  public static transformValue(value: string): ErrorType {
    const mappedValue = ErrorTypeMapping[value];

    if (!mappedValue) {
      Logger.info('Missing mapping value in %s for %s', 'ErrorTypeMapper', value);
    }

    return mappedValue;
  }
}
