import Logger from '@ioc:Adonis/Core/Logger';
import { Exception } from '@poppinss/utils';
import { BackendError, BackendErrors } from '@robinfinance/elwin-js';

import { ForbiddenException, UnauthorizedException } from 'App/Exceptions';

export default class BackendException extends Exception {
  constructor(error: BackendError) {
    Object.keys(error).forEach((errorKey) => {
      switch (errorKey) {
        case BackendErrors.InvalidCustomerTokenError:
        case BackendErrors.MissingCustomerTokenError:
        case BackendErrors.InvalidCGPTokenError:
        case BackendErrors.InvalidTokenError:
        case BackendErrors.MissingTokenError:
          throw new UnauthorizedException();

        case BackendErrors.UserIsInactiveError:
          throw new ForbiddenException(
            'Votre compte est inactif, veuillez contacter le support Elwin.',
          );

        default:
          const errorMessage = `Missing Error mapping value in BackendException for ${errorKey}`;

          Logger.info(errorMessage);
          break;
      }
    });

    super(JSON.stringify(error), 500);
  }
}
