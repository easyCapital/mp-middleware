import { Task as JsonTaskInterface, TaskStatus, TaskType, TaskTypes } from '@robinfinance/js-api';

import { TaskTypeMapper, TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface {
  toJSON(): JsonTaskInterface;
}

export default class Task implements TaskInterface {
  private id: number;
  private key: string;
  private type?: TaskType;
  private subType?: TaskType;
  private status?: TaskStatus;
  private parentId?: number;

  constructor(json: any) {
    this.id = json.id;
    this.key = json.subject.key;
    this.type = TaskTypeMapper.transformValue(json.subject.type);
    this.subType = TaskTypeMapper.transformValue(json.subject.subtasks_type);
    this.status = TaskStatusMapper.transformValue(json.status);
    this.parentId = json.parent ? json.parent : undefined;
  }

  public toJSON(): JsonTaskInterface {
    return {
      id: this.id,
      key: this.key,
      status: this.status,
      type: this.type,
      subType: this.subType,
      parentId: this.parentId,
    };
  }

  public getKey(): string {
    return this.key;
  }

  public getSubType(): TaskTypes | undefined {
    return this.subType;
  }

  public getStatus(): TaskStatus | undefined {
    return this.status;
  }
}
