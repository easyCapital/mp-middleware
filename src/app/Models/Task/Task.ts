import { Task as JsonTaskInterface, TaskStatus, TaskType } from '@robinfinance/js-api';

import TaskSubject from './TaskSubject';
import { TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface<Type> {
  toJSON(): JsonTaskInterface<Type>;
}

export default class Task<Type> implements TaskInterface<Type> {
  private id: number;
  private subject: TaskSubject;
  private status?: TaskStatus;
  private data?: Type;
  private parent?: number;
  private next?: number;

  constructor(json: any) {
    this.id = json.id;
    this.subject = new TaskSubject(json.subject);
    this.status = TaskStatusMapper.transformValue(json.status);
    this.parent = json.parent;
    this.next = json.next_action;
  }

  public toJSON(): JsonTaskInterface<Type> {
    return {
      id: this.id,
      status: this.status,
      subject: this.subject.toJSON(),
      data: this.data,
      parent: this.parent,
      next: this.next,
    };
  }

  public getKey(): string {
    return this.subject.getKey();
  }

  public setKey(key: string): Task<Type> {
    this.subject.setKey(key);

    return this;
  }

  public getNext(): number | undefined {
    return this.next;
  }

  public getParent(): number | undefined {
    return this.parent;
  }

  public getSubject(): TaskSubject {
    return this.subject;
  }

  public getStatus(): TaskStatus | undefined {
    return this.status;
  }

  public getType(): TaskType | undefined {
    return this.subject.getType();
  }

  public setData(data: Type): Task<Type> {
    this.data = data;

    return this;
  }
}
