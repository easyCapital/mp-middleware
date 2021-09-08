import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class CustomerCreationException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;
    const errorMessages: { [key: string]: ErrorType } = {};

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.ToManyEmailRevalidation:
          throw new Exception();

        case BackendErrors.EmailUniqueConstraintError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.USED_EMAIL;
          });
          break;

        case BackendErrors.EmailValidationError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.DEFAULT;
          });
          break;

        case BackendErrors.BlankError:
        case BackendErrors.NullError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.REQUIRED;
          });
          break;

        case BackendErrors.InvalidEmailStatus:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.INVALID_EMAIL;
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

        case BackendErrors.CommonPasswordError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.COMMON_PASSWORD;
          });
          break;

        case BackendErrors.NumericPasswordError:
          error[errorKey].fields.forEach((field) => {
            errorMessages[field] = ErrorTypes.NUMERIC_PASSWORD;
          });
          break;

        case BackendErrors.TemporaryCustomerAlreadyExists:
          error[errorKey].fields.forEach(() => {
            errorMessages.email = ErrorTypes.USER_EXISTS;
          });
          break;

        default:
          errorMessage = `Missing Error mapping value in CustomerCreationException for ${errorKey}`;

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
