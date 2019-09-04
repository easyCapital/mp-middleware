import { Rule as JsonRuleInterface, RuleCondition } from 'mieuxplacer-js-api';

import { getNumberOrString } from '../../Helpers';

import RuleConditionMapper from '../../Mappers/Onboarding/RuleConditionMapper';

interface RuleInterface {
  toJson(): JsonRuleInterface | null;
}

export default class Rule implements RuleInterface {
  private condition?: RuleCondition;
  private valuesToHide: (string | number)[] = [];

  constructor(string: string) {
    const ruleSides = string.split(' then ');
    const condition = RuleConditionMapper.transformValue(ruleSides[0]);
    const consequences = ruleSides[1];

    if (condition) {
      this.condition = condition;
      this.valuesToHide = consequences.split(', ').map(value => getNumberOrString(value));
    }
  }

  public toJson(): JsonRuleInterface | null {
    if (this.condition && this.valuesToHide.length > 0) {
      return {
        condition: this.condition,
        valuesToHide: this.valuesToHide,
      };
    }

    return null;
  }
}
