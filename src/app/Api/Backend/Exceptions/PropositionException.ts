import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { NotFoundException, UnauthorizedException, ForbiddenException, Exception } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class PropositionException extends HttpException {
  constructor(error: BackendError) {
    const environment = Config.get('sentry.environment');

    let errorMessage: string | undefined;

    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.NotFound:
          throw new NotFoundException("Cette proposition n'existe pas.");

        case BackendErrors.InvalidCustomerTokenError:
        case BackendErrors.MissingCustomerTokenError:
          throw new UnauthorizedException("Vous n'avez pas accès à cette proposition");

        case BackendErrors.PermissionDenied:
          throw new ForbiddenException("Vous n'avez pas accès à cette proposition");

        default:
          errorMessage = `Missing Error mapping value in PropositionException for ${errorKey}`;

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

    super(Exception.defaultMessage, 500);
  }
}
