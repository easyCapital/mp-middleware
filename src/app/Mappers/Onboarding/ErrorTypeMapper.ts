import { ErrorTypes } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const ErrorTypeMapping = {
  default: ErrorTypes.DEFAULT,
  required: ErrorTypes.REQUIRED,
  min: ErrorTypes.MIN,
  max: ErrorTypes.MAX,
};

class ErrorTypeMapper extends GenericMapper<ErrorTypes> {
  protected readonly mapping = ErrorTypeMapping;
}

export default new ErrorTypeMapper();
