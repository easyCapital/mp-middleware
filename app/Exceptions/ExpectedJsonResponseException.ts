import { Exception } from '@poppinss/utils';

export default class ExpectedJsonResponseException extends Exception {
  public static get defaultMessage() {
    return 'Le middleware attendait une réponse au format JSON provenant du Backend et a reçu autre chose.';
  }

  constructor(message?: string) {
    super(message || ExpectedJsonResponseException.defaultMessage, 500);
  }
}
