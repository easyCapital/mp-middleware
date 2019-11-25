import { TaskStatuses, TaskStatus } from '@robinfinance/js-api';

const Logger = use('Logger');

const TaskStatusMapping = {
  '1': TaskStatuses.TODO,
  '2': TaskStatuses.PENDING,
  '3': TaskStatuses.OK,
  '4': TaskStatuses.KO,
  '5': TaskStatuses.INACCESSIBLE,
  '6': TaskStatuses.DISABLED,
};

export default class TaskStatusMapper {
  public static transformValue(value: string): TaskStatus | undefined {
    const mappedValue = TaskStatusMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'TaskStatusMapper', value);

    return undefined;
  }

  public static reverseTransform(value: TaskStatus): string | undefined {
    const key = Object.keys(TaskStatusMapping).find(item => TaskStatusMapping[item] === value);

    if (key) {
      return key;
    }

    Logger.info('Missing reverse mapping value in %s for %s', 'TaskStatusMapper', value);

    return undefined;
  }
}
