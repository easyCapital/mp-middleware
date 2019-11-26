import { Task as JsonTaskInterface, TaskStatus, TaskType } from '@robinfinance/js-api';

import { TaskTypeMapper, TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface {
  toJSON(): JsonTaskInterface;
}

export default class Task implements TaskInterface {
  private key: string;
  private type?: TaskType;
  private subType?: TaskType;
  private status?: TaskStatus;
  private order: number;
  private parentId?: number;

  constructor(json: any) {
    this.key = json.subject.key;
    this.type = TaskTypeMapper.transformValue(json.subject.type);
    this.subType = TaskTypeMapper.transformValue(json.subject.subtasks_type);
    this.status = TaskStatusMapper.transformValue(json.status);
    this.order = json.id;
    this.parentId = json.parent ? json.parent : undefined;
  }

  public toJSON(): JsonTaskInterface {
    return {
      key: this.key,
      status: this.status,
      type: this.type,
      subType: this.subType,
      order: this.order,
      parentId: this.parentId,
    };
  }

  public getKey(): string {
    return this.key;
  }
}
