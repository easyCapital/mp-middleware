import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { UnauthorizedException } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class BackendException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

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

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              context: { error },
            });
          }

          Logger.info(errorMessage);
          break;
      }
    });

    super(JSON.stringify(error), 500);
  }
}
