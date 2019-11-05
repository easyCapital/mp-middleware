import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType } from '@robinfinance/js-api';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';

const Logger = use('Logger');

export default class ProspectException extends HttpException {
  constructor(error: BackendError) {
    let errorMessageType: { [key: string]: ErrorType } = { email: ErrorTypes.DEFAULT };

    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.EmailAlreadyAssignedToUserError:
          errorMessageType = { global: ErrorTypes.USED_EMAIL };
          break;

        case BackendErrorTypes.InvalidEmailStatus:
          errorMessageType = { email: ErrorTypes.INVALID_EMAIL };
          break;

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'ProspectException', errorKey);
          break;
      }
    });

    // @ts-ignore
    super(errorMessageType, 400);
  }
}
