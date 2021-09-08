import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { UnauthorizedException, ForbiddenException } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class BackendException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidCustomerTokenError:
        case BackendErrors.MissingCustomerTokenError:
        case BackendErrors.InvalidCGPTokenError:
        case BackendErrors.InvalidTokenError:
        case BackendErrors.MissingTokenError:
          throw new UnauthorizedException();

        case BackendErrors.UserIsInactiveError:
          throw new ForbiddenException('Votre compte est inactif, veuillez contacter le support Elwin.');

        default:
          errorMessage = `Missing Error mapping value in BackendException for ${errorKey}`;

          if (environment === 'staging' || environment === 'production') {
            const Sentry = use('Sentry');

            Sentry.captureMessage(errorMessage, {
              contexts: {
                error: {
                  error: JSON.stringify(error),
                },
              },
            });
          }

          Logger.info(errorMessage);
          break;
      }
    });

    super(JSON.stringify(error), 500);
  }
}
