import { InputType, InputTypes } from 'mieuxplacer-js-api';

const Logger = use('Logger');

enum InputTypeMapping {
  'text' = InputTypes.TEXT,
  'number' = InputTypes.NUMBER,
  'select' = InputTypes.SELECT,
  'radio' = InputTypes.RADIO,
  'checkbox' = InputTypes.CHECKBOX,
  'email' = InputTypes.EMAIL,
  'password' = InputTypes.PASSWORD,
  'phone' = InputTypes.PHONE,
  'icon_checkbox' = InputTypes.ICON_CHECKBOX,
  'bordered_checkbox' = InputTypes.BORDERED_CHECKBOX,
  'chart' = InputTypes.CHART,
  'option_stepper' = InputTypes.OPTION_STEPPER,
}

export default class InputTypeMapper {
  public static transformValue(value: string): InputType | null {
    const mappedValue = InputTypeMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'InputTypeMapper', value);

    return null;
  }
}
