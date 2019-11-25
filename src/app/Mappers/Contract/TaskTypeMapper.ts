import { TaskTypes, TaskType } from '@robinfinance/js-api';

const Logger = use('Logger');

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

export default class TaskTypeMapper {
  public static transformValue(value: string): TaskType | undefined {
    const mappedValue = TaskTypeMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'TaskTypeMapper', value);

    return undefined;
  }

  public static reverseTransform(value: TaskType): string | undefined {
    const key = Object.keys(TaskTypeMapping).find(item => TaskTypeMapping[item] === value);

    if (key) {
      return key;
    }

    Logger.info('Missing reverse mapping value in %s for %s', 'TaskTypeMapper', value);

    return undefined;
  }
}
