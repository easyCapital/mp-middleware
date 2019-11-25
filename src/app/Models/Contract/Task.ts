import { Task as JsonTaskInterface, TaskStatus, TaskType } from '@robinfinance/js-api';

import { TaskTypeMapper, TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface {
  toJSON(): JsonTaskInterface;
}

export default class Task implements TaskInterface {
  private key: string;
  private type?: TaskType;
  private status?: TaskStatus;
  private order: number;

  constructor(json: any) {
    this.key = json.subject.key;
    this.type = TaskTypeMapper.transformValue(json.subject.type);
    this.status = TaskStatusMapper.transformValue(json.status);
    this.order = json.id;
  }

  public toJSON(): JsonTaskInterface {
    return {
      key: this.key,
      status: this.status,
      type: this.type,
      order: this.order,
    };
  }

  public getKey(): string {
    return this.key;
  }
}
