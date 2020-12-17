import { Exception } from '@poppinss/utils';
import { BackendError, BackendErrors, ErrorTypes } from '@robinfinance/elwin-js';

import BackendException from './BackendException';

export default class ChangePasswordException extends Exception {
  constructor(error: BackendError) {
    const errorMessages: { [key: string]: string } = {};

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
          throw new BackendException(error);
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
