import { HttpException } from '@adonisjs/generic-exceptions';

export default class InvalidArgumentException extends HttpException {
  static get defaultMessage() {
    return 'Pas tous les arguments nécessaires ont été fournis.';
  }

  constructor(message?: string) {
    super(message || InvalidArgumentException.defaultMessage, 400);
  }
}
