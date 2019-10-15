import { HttpException } from '@adonisjs/generic-exceptions';

import { Exception } from '../../../Exceptions';

export default class BackendException extends HttpException {
  constructor(exception?: any) {
    let message: string = Exception.defaultMessage;

    if (exception) {
      if (exception.json) {
        const data = exception.json();

        message = JSON.stringify(data);
      } else if (exception.message) {
        message = exception.message;
      } else {
        message = exception;
      }
    }

    super(message, 500);
  }
}
