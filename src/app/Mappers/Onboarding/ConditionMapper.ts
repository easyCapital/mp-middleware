import { Condition, ConditionTypes } from '@robinfinance/js-api';

import { getNumberOrString } from '../../Helpers';

const Logger = use('Logger');

export default class ConditionMapper {
  public static transformValue(value: string): Condition | null {
    if (value.match(/\snot in\s/g)) {
      const conditionElements = value.split(' not in ');

      return {
        key: conditionElements[1].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[0]),
        type: ConditionTypes.NOT_IN,
      };
    }

    if (value.match(/\sin\s/g)) {
      const conditionElements = value.split(' in ');

      return {
        key: conditionElements[1].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[0]),
        type: ConditionTypes.IN,
      };
    }

    if (value.match(/\s==\s/g)) {
      const conditionElements = value.split(' == ');

      return {
        key: conditionElements[0].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[1]),
        type: ConditionTypes.EQUALS,
      };
    }

    if (value.match(/\s!=\s/g)) {
      const conditionElements = value.split(' != ');

      return {
        key: conditionElements[0].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[1]),
        type: ConditionTypes.NOT_EQUALS,
      };
    }

    if (value.match(/\s>=\s/g)) {
      const conditionElements = value.split(' >= ');

      return {
        key: conditionElements[0].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[1]),
        type: ConditionTypes.IS_SUPERIOR_OR_EQUAL,
      };
    }

    if (value.match(/\s>\s/g)) {
      const conditionElements = value.split(' > ');

      return {
        key: conditionElements[0].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[1]),
        type: ConditionTypes.IS_SUPERIOR,
      };
    }

    if (value.match(/\s<=\s/g)) {
      const conditionElements = value.split(' <= ');

      return {
        key: conditionElements[0].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[1]),
        type: ConditionTypes.IS_INFERIOR_OR_EQUAL,
      };
    }

    if (value.match(/\s<\s/g)) {
      const conditionElements = value.split(' < ');

      return {
        key: conditionElements[0].replace(/int\(/g, '').replace(/\)/g, ''),
        value: getNumberOrString(conditionElements[1]),
        type: ConditionTypes.IS_INFERIOR,
      };
    }

    if (value === 'true' || value === 'false') {
      return null;
    }

    Logger.warning('Missing mapping value in %s for %s', 'ConditionMapper', value);

    return null;
  }
}
