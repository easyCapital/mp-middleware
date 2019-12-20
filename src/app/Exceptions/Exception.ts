import { HttpException } from '@adonisjs/generic-exceptions';

export default class Exception extends HttpException {
  static get defaultMessage() {
    return 'Un erreur est survenue, veuillez contacter notre support.';
  }

  constructor(message?: string) {
    super(message || Exception.defaultMessage, 500);
  }
}
