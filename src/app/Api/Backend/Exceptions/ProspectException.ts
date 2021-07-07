import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType, BackendError, BackendErrors } from '@robinfinance/js-api';

const Config = use('Config');
const Logger = use('Logger');

export default class ProspectException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');
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
    super(errorMessageType, 400);
  }
}
