import { HttpException } from '@adonisjs/generic-exceptions';
import { ErrorTypes } from '@robinfinance/js-api';

export default class UserIsInactiveException extends HttpException {
  constructor() {
    // @ts-ignore
    super({ global: ErrorTypes.EMAIL_NOT_VERIFIED }, 400);
  }
}
