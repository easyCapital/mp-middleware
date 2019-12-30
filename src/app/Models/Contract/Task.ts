import { Task as JsonTaskInterface, TaskStatus, TaskType } from '@robinfinance/js-api';

import { TaskTypeMapper, TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface<Type> {
  toJSON(): JsonTaskInterface<Type>;
}

export default class Task<Type> implements TaskInterface<Type> {
  private id: number;
  private key: string;
  private type?: TaskType;
  private status?: TaskStatus;
  private data?: Type;

  constructor(json: any) {
    this.id = json.id;
    this.key = json.subject.key;
    this.type = TaskTypeMapper.transformValue(json.subject.type);
    this.status = TaskStatusMapper.transformValue(json.status);
  }

  public toJSON(): JsonTaskInterface<Type> {
    return {
      id: this.id,
      key: this.key,
      status: this.status,
      type: this.type,
      data: this.data,
    };
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): Task<Type> {
    this.key = key;

    return this;
  }

  public getType(): TaskType | undefined {
    return this.type;
  }

  public getStatus(): TaskStatus | undefined {
    return this.status;
  }

  public setData(data: Type): Task<Type> {
    this.data = data;

    return this;
  }
}
