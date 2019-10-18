import { HttpException } from '@adonisjs/generic-exceptions';

export default class ExpectedJsonResponseException extends HttpException {
  static get defaultMessage() {
    return 'Le middleware attendait une réponse au format JSON provenant du Backend et a recu autrechose.';
  }

  constructor(message?: string) {
    super(message || ExpectedJsonResponseException.defaultMessage, 500);
  }
}
