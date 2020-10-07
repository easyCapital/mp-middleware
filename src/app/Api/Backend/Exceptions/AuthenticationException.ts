import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, BackendError, BackendErrors } from '@robinfinance/js-api';

const Logger = use('Logger');
const Sentry = use('Sentry');

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
          const errorMessage = `Missing Error mapping value in AuthenticationException for ${errorKey}`;

          Sentry.captureMessage(errorMessage, {
            context: { error },
          });
          Logger.info(errorMessage);
          break;
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
