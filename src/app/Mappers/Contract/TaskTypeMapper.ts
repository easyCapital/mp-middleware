import { TaskTypes } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const TaskTypeMapping = {
  '1': TaskTypes.KYC,
  '2': TaskTypes.QUESTION,
  '3': TaskTypes.FILE,
  '4': TaskTypes.SIGNATURE,
  '5': TaskTypes.PAYMENT,
  '6': TaskTypes.APPOINTMENT,
  '7': TaskTypes.CONTAINER,
  '8': TaskTypes.SIGNATURE_PAPER,
  '9': TaskTypes.SIGNATURE_DIGITAL,
};

class TaskTypeMapper extends GenericMapper<TaskTypes> {
  protected readonly mapping = TaskTypeMapping;
}

export default new TaskTypeMapper();
