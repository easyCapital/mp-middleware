import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { NotFoundException, UnauthorizedException, ForbiddenException, Exception } from '../../../Exceptions';

const Logger = use('Logger');
const Sentry = use('Sentry');

export default class PropositionException extends HttpException {
  constructor(error: BackendError) {
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
          const errorMessage = `Missing Error mapping value in PropositionException for ${errorKey}`;

          Sentry.captureMessage(errorMessage, {
            context: { error },
          });
          Logger.info(errorMessage);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
