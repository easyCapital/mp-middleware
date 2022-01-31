import { InputTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const InputTypeMapping = {
  text: InputTypes.TEXT,
  number: InputTypes.NUMBER,
  email: InputTypes.EMAIL,
  password: InputTypes.PASSWORD,
  phone: InputTypes.PHONE,
  date: InputTypes.DATE,
  textarea: InputTypes.TEXTAREA,
  select: InputTypes.SELECT,
  searchable_select: InputTypes.SEARCHABLE_SELECT,
  radio: InputTypes.RADIO,
  checkbox: InputTypes.CHECKBOX,
  icon_checkbox: InputTypes.ICON_CHECKBOX,
  bordered_checkbox: InputTypes.BORDERED_CHECKBOX,
  chart: InputTypes.CHART,
  option_stepper: InputTypes.OPTION_STEPPER,
  member_selector: InputTypes.MEMBER_SELECTOR,
};

class InputTypeMapper extends GenericMapper<InputTypes> {
  protected readonly mapping = InputTypeMapping;
}

export default new InputTypeMapper();
