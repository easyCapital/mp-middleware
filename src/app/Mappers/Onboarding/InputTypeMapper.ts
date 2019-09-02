import { InputType, InputTypes } from 'mieuxplacer-js-api';

const Logger = use('Logger');

enum InputTypeMapping {
  'text' = InputTypes.TEXT,
  'number' = InputTypes.NUMBER,
  'select' = InputTypes.SELECT,
  'radio' = InputTypes.RADIO,
  'list' = InputTypes.CHECKBOX,
  'email' = InputTypes.EMAIL,
  'password' = InputTypes.PASSWORD,
  'tel_mobile' = InputTypes.PHONE,
  'icon-checkbox' = InputTypes.ICON_CHECKBOX,
  'bordered-checkbox' = InputTypes.BORDERED_CHECKBOX,
  'chart' = InputTypes.CHART,
  'option-stepper' = InputTypes.OPTION_STEPPER,
}

export default class InputTypeMapper {
  public static transformValue(value: string): InputType {
    const mappedValue = InputTypeMapping[value];

    if (!mappedValue) {
      Logger.info('Missing mapping value in %s for %s', 'InputTypeMapper', value);
    }

    return mappedValue;
  }
}
