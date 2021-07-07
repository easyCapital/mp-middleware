import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

export default class AuthenticationException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');
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

        case BackendErrors.UserIsInactiveError:
          errorMessages.global = ErrorTypes.USER_INACTIVE;

        default:
          const errorMessage = `Missing Error mapping value in AuthenticationException for ${errorKey}`;

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              contexts: {
                error: {
                  error: JSON.stringify(error),
                },
              },
            });
          }

          Logger.info(errorMessage);
          break;
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
