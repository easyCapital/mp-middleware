import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

export default class ChangePasswordException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');
    const errorMessages: { [key: string]: ErrorType } = {};

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.CommonPasswordError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.COMMON_PASSWORD;
          });
          break;

        case BackendErrors.MinimumLengthError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.MIN;
          });
          break;

        case BackendErrors.UserAttributeSimilarityError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.SIMILAR_PASSWORD;
          });
          break;

        case BackendErrors.NumericPasswordError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.NUMERIC_PASSWORD;
          });
          break;

        case BackendErrors.InvalidError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.INVALID_CREDENTIALS;
          });
          break;

        default:
          const errorMessage = `Missing Error mapping value in ChangePasswordException for ${errorKey}`;

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              contexts: { error },
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
