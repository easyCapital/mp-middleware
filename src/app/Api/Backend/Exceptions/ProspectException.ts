import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

const Logger = use('Logger');

export default class ProspectException extends HttpException {
  constructor(error: BackendError) {
    let errorMessageType: { [key: string]: ErrorType } = { email: ErrorTypes.DEFAULT };

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.EmailAlreadyAssignedToUserError:
          errorMessageType = { global: ErrorTypes.USED_EMAIL };
          break;

        case BackendErrors.EmailValidationError:
          errorMessageType = { email: ErrorTypes.DEFAULT };
          break;

        case BackendErrors.InvalidEmailStatus:
          errorMessageType = { email: ErrorTypes.INVALID_EMAIL };
          break;

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'ProspectException', errorKey);
          break;
      }
    });

    // @ts-ignore
    super(errorMessageType, 400);
  }
}
