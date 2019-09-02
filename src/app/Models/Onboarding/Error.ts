import { Error as JsonErrorInterface, ErrorTypes } from 'mieuxplacer-js-api';

import { ErrorTypeMapper } from '../../Mappers/Onboarding';

interface ErrorInterface {
  toJson(): JsonErrorInterface;
}

export default class Error implements ErrorInterface {
  private type: ErrorTypes;
  private label: string;

  constructor(json: any) {
    this.type = ErrorTypeMapper.transformValue(json.type);
    this.label = json.label;
  }

  public toJson(): JsonErrorInterface {
    return {
      type: this.type,
      label: this.label,
    };
  }
}
