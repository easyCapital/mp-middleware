import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

const Logger = use('Logger');
const Sentry = use('Sentry');

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
          const errorMessage = `Missing Error mapping value in ProspectException for ${errorKey}`;

          Sentry.captureMessage(errorMessage, {
            context: { error },
          });
          Logger.info(errorMessage);
          break;
      }
    });

    // @ts-ignore
    super(errorMessageType, 400);
  }
}
