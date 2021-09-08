import { HttpException } from '@adonisjs/generic-exceptions';

export default class Exception extends HttpException {
  static get defaultMessage(): string {
    return 'Un erreur est survenue, veuillez contacter le support Elwin.';
  }

  constructor(message?: string) {
    super(message || Exception.defaultMessage, 500);
  }
}
