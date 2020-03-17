import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';

const Logger = use('Logger');

export default class CustomerCreationException extends HttpException {
  constructor(error: BackendError) {
    const errorMessages: { [key: string]: ErrorTypes } = {};

    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.ToManyEmailRevalidation:
          throw new Exception();

        case BackendErrorTypes.EmailUniqueConstraintError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.USED_EMAIL;
          });
          break;

        case BackendErrorTypes.EmailValidationError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.DEFAULT;
          });
          break;

        case BackendErrorTypes.BlankError:
        case BackendErrorTypes.NullError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.REQUIRED;
          });
          break;

        case BackendErrorTypes.InvalidEmailStatus:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.INVALID_EMAIL;
          });
          break;

        case BackendErrorTypes.MinimumLengthError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.MIN;
          });
          break;

        case BackendErrorTypes.UserAttributeSimilarityError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.SIMILAR_PASSWORD;
          });
          break;

        case BackendErrorTypes.CommonPasswordError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.COMMON_PASSWORD;
          });
          break;

        case BackendErrorTypes.NumericPasswordError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.NUMERIC_PASSWORD;
          });
          break;

        case BackendErrorTypes.TemporaryCustomerAlreadyExists:
          error[errorKey].fields.forEach(() => {
            errorMessages.email = ErrorTypes.USER_EXISTS;
          });
          break;

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'CustomerCreationException', errorKey);
          break;
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
