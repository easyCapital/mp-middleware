import { Condition as JsonConditionInterface, ConditionType } from 'mieuxplacer-js-api';

import { ConditionMapper } from '../../Mappers/Onboarding';

interface ConditionInterface {
  toJson(): JsonConditionInterface | null;
}

export default class Condition implements ConditionInterface {
  private key?: string;
  private value?: string | number;
  private type?: ConditionType;

  constructor(string: string) {
    const condition = ConditionMapper.transformValue(string);

    if (condition) {
      this.key = condition.key;
      this.value = condition.value;
      this.type = condition.type;
    }
  }

  public toJson(): JsonConditionInterface | null {
    if (this.key && this.value && this.type) {
      return {
        key: this.key,
        value: this.value,
        type: this.type,
      };
    }

    return null;
  }
}
