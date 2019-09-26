import { Error as JsonErrorInterface, ErrorTypes } from 'mieuxplacer-js-api';

import { ErrorTypeMapper } from '../../Mappers/Onboarding';

interface ErrorInterface {
  toJSON(): JsonErrorInterface | null;
}

export default class Error implements ErrorInterface {
  private type: ErrorTypes | null;
  private label: string;

  constructor(type: string, label: string) {
    this.type = ErrorTypeMapper.transformValue(type);
    this.label = label;
  }

  public toJSON(): JsonErrorInterface | null {
    if (this.type && this.label) {
      return {
        type: this.type,
        label: this.label,
      };
    }

    return null;
  }
}
