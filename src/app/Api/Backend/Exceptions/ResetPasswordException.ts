import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';
import { ChangePasswordException } from '.';

export default class ResetPasswordException extends HttpException {
  constructor(error: BackendError) {
    const errorMessages: { [key: string]: ErrorType } = {};

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
