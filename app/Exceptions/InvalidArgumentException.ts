import { Exception as DefaultException } from '@poppinss/utils';

export default class InvalidArgumentException extends DefaultException {
  public static get defaultMessage() {
    return 'Un erreur est survenue, veuillez contacter le support Elwin.';
  }

  constructor(message?: string) {
    super(message || InvalidArgumentException.defaultMessage, 400);
  }
}
