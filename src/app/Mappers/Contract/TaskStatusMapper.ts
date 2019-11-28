import { TaskStatuses } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const TaskStatusMapping = {
  '1': TaskStatuses.TODO,
  '2': TaskStatuses.PENDING,
  '3': TaskStatuses.OK,
  '4': TaskStatuses.KO,
  '5': TaskStatuses.INACCESSIBLE,
  '6': TaskStatuses.DISABLED,
};

class TaskTypeMapper extends GenericMapper<TaskStatuses> {
  protected readonly mapping = TaskStatusMapping;
}

export default new TaskTypeMapper();
