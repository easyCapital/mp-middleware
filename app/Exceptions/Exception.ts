import { Exception as DefaultException } from '@poppinss/utils';

export default class Exception extends DefaultException {
  public static get defaultMessage() {
    return 'Un erreur est survenue, veuillez contacter le support Elwin.';
  }

  constructor(message?: string) {
    super(message || Exception.defaultMessage, 500);
  }
}
