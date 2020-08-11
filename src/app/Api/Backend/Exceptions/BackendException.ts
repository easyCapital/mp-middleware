import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { UnauthorizedException } from '../../../Exceptions';

const Logger = use('Logger');

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
          Logger.info('Missing Error mapping value in %s for %s', 'BackendException', errorKey);
          break;
      }
    });

    super(JSON.stringify(error), 500);
  }
}
