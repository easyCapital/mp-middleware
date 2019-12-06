import { Task as JsonTaskInterface, TaskStatus, TaskType } from '@robinfinance/js-api';

import { TaskTypeMapper, TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface {
  toJSON(): JsonTaskInterface;
}

export default class Task implements TaskInterface {
  private id: number;
  private key: string;
  private type?: TaskType;
  private status?: TaskStatus;

  constructor(json: any) {
    this.id = json.id;
    this.key = json.subject.key;
    this.type = TaskTypeMapper.transformValue(json.subject.type);
    this.status = TaskStatusMapper.transformValue(json.status);
  }

  public toJSON(): JsonTaskInterface {
    return {
      id: this.id,
      key: this.key,
      status: this.status,
      type: this.type,
    };
  }

  public getKey(): string {
    return this.key;
  }

  public getType(): TaskType | undefined {
    return this.type;
  }

  public getStatus(): TaskStatus | undefined {
    return this.status;
  }
}
