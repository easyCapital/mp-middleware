import { HttpException } from '@adonisjs/generic-exceptions';

export default class FileTooBigException extends HttpException {
  static get defaultMessage() {
    return 'Le document dépasse la taille maximale autorisée de 5Mo.';
  }

  constructor(message?: string) {
    super(message || FileTooBigException.defaultMessage, 413);
  }
}
