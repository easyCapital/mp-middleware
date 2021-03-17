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
  '10': TaskTypes.GROUP,
  '11': TaskTypes.PROPOSITION_AUTO,
  '12': TaskTypes.PROPOSITION_MANUAL,
  '13': TaskTypes.GENERATE,
  '14': TaskTypes.TUNNEL,
  '15': TaskTypes.UPLOAD,
  '16': TaskTypes.DOWNLOAD,
  '17': TaskTypes.RIC,
  '18': TaskTypes.OBSERVATIONS,
  '19': TaskTypes.DOWNLOAD_FILE,
  '20': TaskTypes.PROPOSITION_EXTERNAL,
  '21': TaskTypes.UPLOAD_EXTERNAL_FILE,
};

class TaskTypeMapper extends GenericMapper<TaskTypes> {
  protected readonly mapping = TaskTypeMapping;
}

export default new TaskTypeMapper();
