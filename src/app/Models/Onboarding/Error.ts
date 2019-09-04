import { Error as JsonErrorInterface, ErrorTypes } from 'mieuxplacer-js-api';

import { ErrorTypeMapper } from '../../Mappers/Onboarding';

interface ErrorInterface {
  toJson(): JsonErrorInterface | null;
}

export default class Error implements ErrorInterface {
  private type: ErrorTypes | null;
  private label: string;

  constructor(json: any) {
    this.type = ErrorTypeMapper.transformValue(json.type);
    this.label = json.label;
  }

  public toJson(): JsonErrorInterface | null {
    if (this.type && this.label) {
      return {
        type: this.type,
        label: this.label,
      };
    }

    return null;
  }
}
