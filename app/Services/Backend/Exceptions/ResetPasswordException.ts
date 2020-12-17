import { Exception } from '@poppinss/utils';
import { BackendError, BackendErrors, ErrorTypes } from '@robinfinance/elwin-js';

import ChangePasswordException from './ChangePasswordException';

export default class ResetPasswordException extends Exception {
  constructor(error: BackendError) {
    const errorMessages: { [key: string]: string } = {};

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidResetPasswordUidOrTokenError:
          errorMessages.global = ErrorTypes.INVALID_UID_OR_TOKEN;
          break;

        default:
          throw new ChangePasswordException(error);
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
