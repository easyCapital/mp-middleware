import { Exception } from '@poppinss/utils';

export default class NotFoundException extends Exception {
  public static get defaultMessage() {
    return 'Cette ressource est introuvable.';
  }

  constructor(message?: string) {
    super(message || NotFoundException.defaultMessage, 404);
  }
}
