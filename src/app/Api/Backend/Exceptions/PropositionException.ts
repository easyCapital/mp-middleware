import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { NotFoundException, UnauthorizedException, ForbiddenException, Exception } from '../../../Exceptions';

const Logger = use('Logger');

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
          Logger.info('Missing Error mapping value in %s for %s', 'PropositionException', errorKey);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
