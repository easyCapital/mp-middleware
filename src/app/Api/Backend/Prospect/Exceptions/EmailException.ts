import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType } from 'mieuxplacer-js-api';

import { BackendError, BackendErrorTypes } from '../../../../Clients/Backend/types';

const Logger = use('Logger');

export default class EmailException extends HttpException {
  constructor(error: BackendError) {
    let errorMessageType: ErrorType = ErrorTypes.DEFAULT;

    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.EmailAlreadyAssignedToUserError:
          errorMessageType = ErrorTypes.USED_EMAIL;
          break;

        case BackendErrorTypes.InvalidEmailStatus:
          errorMessageType = ErrorTypes.INVALID_EMAIL;
          break;

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'EmailException', errorKey);
          break;
      }
    });

    // @ts-ignore
    super({ email: errorMessageType }, 400);
  }
}
