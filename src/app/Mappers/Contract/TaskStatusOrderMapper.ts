import { TaskStatuses } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const TaskStatusOrderMapping = {
  [TaskStatuses.TODO]: 1,
  [TaskStatuses.PENDING]: 2,
  [TaskStatuses.KO]: 3,
  [TaskStatuses.INACCESSIBLE]: 4,
  [TaskStatuses.DISABLED]: 5,
  [TaskStatuses.OK]: 6,
};

class TaskStatusOrderMapper extends GenericMapper<TaskStatuses> {
  protected readonly mapping = TaskStatusOrderMapping;
}

export default new TaskStatusOrderMapper();
