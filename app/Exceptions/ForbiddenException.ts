import { Exception } from '@poppinss/utils';

export default class ForbiddenException extends Exception {
  public static get defaultMessage() {
    return "Vous n'avez pas accès à cette ressource.";
  }

  constructor(message?: string) {
    super(message || ForbiddenException.defaultMessage, 403);
  }
}
