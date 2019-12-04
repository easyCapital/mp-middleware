import { LogicalException } from '@adonisjs/generic-exceptions';

export default class NotFoundException extends LogicalException {
  static get defaultMessage() {
    return 'Missing mapping value in Mapper.';
  }

  constructor(message?: string) {
    super(message || NotFoundException.defaultMessage, 404);
  }
}
