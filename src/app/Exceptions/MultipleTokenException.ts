import { HttpException } from '@adonisjs/generic-exceptions';

export default class MultipleTokenException extends HttpException {
  static get defaultMessage() {
    return "Le middleware n'accepte qu'un token à la fois.";
  }

  constructor(message?: string) {
    super(message || MultipleTokenException.defaultMessage, 500);
  }
}
