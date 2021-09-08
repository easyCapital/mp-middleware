import { HttpException } from '@adonisjs/generic-exceptions';

export default class InvalidArgumentException extends HttpException {
  static get defaultMessage(): string {
    return "Tous les arguments nécessaires n'ont pas été fournis.";
  }

  constructor(message?: string | { [key: string]: string }) {
    // @ts-ignore
    super(message || InvalidArgumentException.defaultMessage, 400);
  }
}
