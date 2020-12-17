import { Exception } from '@poppinss/utils';

export default class FileTooBigException extends Exception {
  public static get defaultMessage() {
    return 'Le document dépasse la taille maximale autorisée de 5Mo.';
  }

  constructor(message?: string) {
    super(message || FileTooBigException.defaultMessage, 413);
  }
}
