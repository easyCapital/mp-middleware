import { TaskStatuses } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const TaskStatusOrderMapping = {
  [TaskStatuses.WIP]: 1,
  [TaskStatuses.TODO]: 2,
  [TaskStatuses.PENDING]: 3,
  [TaskStatuses.KO]: 4,
  [TaskStatuses.INACCESSIBLE]: 5,
  [TaskStatuses.DISABLED]: 6,
  [TaskStatuses.OK]: 7,
};

class TaskStatusOrderMapper extends GenericMapper<TaskStatuses> {
  protected readonly mapping = TaskStatusOrderMapping;
}

export default new TaskStatusOrderMapper();
