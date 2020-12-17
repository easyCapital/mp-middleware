import { Exception } from '@poppinss/utils';
import { BackendError, BackendErrors, ErrorTypes } from '@robinfinance/elwin-js';

import BackendException from './BackendException';

export default class AuthenticationException extends Exception {
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

        case BackendErrors.UserIsInactiveError:
          errorMessages.global = ErrorTypes.USER_INACTIVE;
          break;

        default:
          throw new BackendException(error);
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
