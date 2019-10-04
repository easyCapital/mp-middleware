import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes, ErrorType } from 'mieuxplacer-js-api';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';

const Logger = use('Logger');

export default class AuthenticationException extends HttpException {
  constructor(error: BackendError) {
    const errorMessages = {};

    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.MissingMandatoryFieldsError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.REQUIRED;
          });
          break;

        case BackendErrorTypes.EmailValidationError:
          error[errorKey].fields.forEach(field => {
            errorMessages[field] = ErrorTypes.DEFAULT;
          });
          break;

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'AuthenticationException', errorKey);
          break;
      }
    });

    // @ts-ignore
    super(errorMessages, 400);
  }
}
