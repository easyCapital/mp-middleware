import { RuleTypes, RuleCondition } from 'mieuxplacer-js-api';

import { getNumberOrString } from '../../Helpers';

const Logger = use('Logger');

export default class RuleConditionMapper {
  public static transformValue(value: string): RuleCondition | null {
    if (value.match(/\snot in\s/g)) {
      const conditionElements = value.split(' not in ');

      return {
        key: conditionElements[1],
        value: conditionElements[0].split(', ').map(item => getNumberOrString(item)),
        type: RuleTypes.NOT_IN,
      };
    }

    if (value.match(/\sin\s/g)) {
      const conditionElements = value.split(' in ');

      return {
        key: conditionElements[1],
        value: conditionElements[0].split(', ').map(item => getNumberOrString(item)),
        type: RuleTypes.IN,
      };
    }

    Logger.info('Missing mapping value in %s for %s', 'RuleMapper', value);

    return null;
  }
}
