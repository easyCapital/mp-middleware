import { HttpException } from '@adonisjs/generic-exceptions';

export default class ForbiddenException extends HttpException {
  static get defaultMessage(): string {
    return "Access interdit. Vous n'avez pas accès à cette ressource.";
  }

  constructor(message?: string) {
    super(message || ForbiddenException.defaultMessage, 403);
  }
}
