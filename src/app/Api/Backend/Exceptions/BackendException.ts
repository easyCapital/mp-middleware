import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { UnauthorizedException } from '../../../Exceptions';

const Logger = use('Logger');
const Sentry = use('Sentry');

export default class BackendException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidCustomerTokenError:
        case BackendErrors.MissingCustomerTokenError:
        case BackendErrors.InvalidCGPTokenError:
        case BackendErrors.InvalidTokenError:
        case BackendErrors.MissingTokenError:
          throw new UnauthorizedException();

        default:
          const errorMessage = `Missing Error mapping value in BackendException for ${errorKey}`;

          Sentry.captureMessage(errorMessage, {
            context: { error },
          });
          Logger.info(errorMessage);
          break;
      }
    });

    super(JSON.stringify(error), 500);
  }
}
