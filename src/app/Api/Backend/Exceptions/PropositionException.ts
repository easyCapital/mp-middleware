import { HttpException } from '@adonisjs/generic-exceptions';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';
import { NotFoundException, UnauthorizedException, ForbiddenException, Exception } from '../../../Exceptions';

const Logger = use('Logger');

export default class PropositionException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.NotFound:
          throw new NotFoundException("Cette proposition n'existe pas.");

        case BackendErrorTypes.InvalidCustomerTokenError:
        case BackendErrorTypes.MissingCustomerTokenError:
          throw new UnauthorizedException("Vous n'avez pas accès à cette proposition");

        case BackendErrorTypes.PermissionDenied:
          throw new ForbiddenException("Vous n'avez pas accès à cette proposition");

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'PropositionException', errorKey);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
