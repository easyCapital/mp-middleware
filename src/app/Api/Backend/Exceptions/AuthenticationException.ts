import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, BackendError, BackendErrors } from '@robinfinance/js-api';

const Logger = use('Logger');

export default class AuthenticationException extends HttpException {
  constructor(error: BackendError) {
    const errorMessages: { [key: string]: string } = {};

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidCredentialsError:
          errorMessages.global = ErrorTypes.INVALID_CREDENTIALS;
          break;

        case BackendErrors.MissingMandatoryFieldsError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.REQUIRED;
          });
          break;

        case BackendErrors.EmailValidationError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.DEFAULT;
          });
          break;

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'AuthenticationException', errorKey);
          break;
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
