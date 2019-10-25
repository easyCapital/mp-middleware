import { HttpException } from '@adonisjs/generic-exceptions';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';
import { UnauthorizedException } from '../../../Exceptions';

const Logger = use('Logger');

export default class BackendException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.InvalidCustomerTokenError:
        case BackendErrorTypes.MissingCustomerTokenError:
          throw new UnauthorizedException();

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'BackendException', errorKey);
          break;
      }
    });

    super(JSON.stringify(error), 500);
  }
}
