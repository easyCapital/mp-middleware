import { HttpException } from '@adonisjs/generic-exceptions';

export default class InvalidArgumentException extends HttpException {
  static get defaultMessage() {
    return 'Tous les arguments nécessaires n\'ont pas été fournis.';
  }

  constructor(message?: string) {
    super(message || InvalidArgumentException.defaultMessage, 400);
  }
}
