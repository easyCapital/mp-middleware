import { TaskTypes, TaskType } from '@robinfinance/js-api';

const Logger = use('Logger');

const TaskOrderMapping = {
  [TaskTypes.KYC]: 1,
  [TaskTypes.QUESTION]: 2,
  [TaskTypes.FILE]: 3,
  [TaskTypes.SIGNATURE_PAPER]: 4,
  [TaskTypes.SIGNATURE_DIGITAL]: 4,
  [TaskTypes.SIGNATURE]: 4,
  [TaskTypes.PAYMENT]: 5,
  [TaskTypes.APPOINTMENT]: 6,
};

export default class TaskOrderMapper {
  public static transformValue(value: TaskType): TaskType | undefined {
    const mappedValue = TaskOrderMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'TaskOrderMapper', value);

    return undefined;
  }

  public static reverseTransform(value: number): string | undefined {
    const key = Object.keys(TaskOrderMapping).find(item => TaskOrderMapping[item] === value);

    if (key) {
      return key;
    }

    Logger.info('Missing reverse mapping value in %s for %s', 'TaskOrderMapper', value);

    return undefined;
  }
}
