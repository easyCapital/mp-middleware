import { HttpException } from '@adonisjs/generic-exceptions';

export default class Exception extends HttpException {
  static get defaultMessage() {
    return 'Something went wrong on our side, please contact our support.';
  }

  constructor(message?: string) {
    super(message || Exception.defaultMessage, 500);
  }
}
