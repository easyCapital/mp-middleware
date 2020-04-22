import { TaskTypes } from '@robinfinance/js-api';

import { Task } from '../../../Models/Task';
import { TaskOrderMapper, TaskStatusOrderMapper } from '../../../Mappers/Contract';

function formatContractTasks(tasks: Task<any>[]): Task<any>[] {
  const formattedTasks: { [order: string]: Task<any> } = {};

  tasks.forEach((task) => {
    const type = task.getType();

    if (type && type !== TaskTypes.CONTAINER && type !== TaskTypes.GROUP) {
      const taskOrder = TaskOrderMapper.transformValue(type);

      if (taskOrder) {
        if (formattedTasks[taskOrder]) {
          const taskStatus = task.getStatus();
          const previousTask = formattedTasks[taskOrder];
          const previousStatus = previousTask.getStatus();

          if (previousStatus) {
            if (taskStatus) {
              const taskStatusOrder = TaskStatusOrderMapper.transformValue(taskStatus);
              const previousStatusOrder = TaskStatusOrderMapper.transformValue(previousStatus);

              if (previousStatusOrder) {
                if (taskStatusOrder) {
                  if (Number(taskStatusOrder) < Number(previousStatusOrder)) {
                    formattedTasks[taskOrder] = task;
                  }
                }
              } else {
                formattedTasks[taskOrder] = task;
              }
            }
          } else {
            formattedTasks[taskOrder] = task;
          }
        } else {
          formattedTasks[taskOrder] = task;
        }
      }
    }
  });

  return Object.values(formattedTasks);
}

export default formatContractTasks;
