import { HttpException } from '@adonisjs/generic-exceptions';

export default class NotFoundException extends HttpException {
  static get defaultMessage(): string {
    return 'Cette ressource est introuvable.';
  }

  constructor(message?: string) {
    super(message || NotFoundException.defaultMessage, 404);
  }
}
