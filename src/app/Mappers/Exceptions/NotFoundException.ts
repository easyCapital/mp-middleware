import { LogicalException } from '@adonisjs/generic-exceptions';

export default class NotFoundException extends LogicalException {
  static get defaultMessage(): string {
    return 'Missing mapping value in Mapper.';
  }

  constructor(message?: string) {
    super(message || NotFoundException.defaultMessage, 404);
  }
}
