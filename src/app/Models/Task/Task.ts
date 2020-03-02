import { Task as JsonTaskInterface, TaskStatus, TaskType } from '@robinfinance/js-api';

import TaskSubject from './TaskSubject';
import { TaskStatusMapper } from '../../Mappers/Contract';

interface TaskInterface<Type> {
  toJSON(): JsonTaskInterface<Type>;
}

export default class Task<Type> implements TaskInterface<Type> {
  private id: number;
  private label: string;
  private subject: TaskSubject;
  private status?: TaskStatus;
  private data?: Type;
  private parent: number | null;
  private next: number | null;
  private order: number;
  private contract?: number;

  constructor(json: any) {
    this.id = json.id;
    this.label = json.label;
    this.subject = new TaskSubject(json.subject);
    this.status = TaskStatusMapper.transformValue(json.status);
    this.parent = json.parent;
    this.next = json.next_action;
    this.order = json.execution_order;
    this.contract = json.contract;
  }

  public toJSON(): JsonTaskInterface<Type> {
    return {
      id: this.id,
      label: this.label,
      status: this.status,
      subject: this.subject.toJSON(),
      data: this.data,
      parent: this.parent,
      next: this.next,
      order: this.order,
      contract: this.contract,
    };
  }

  public getKey(): string {
    return this.subject.getKey();
  }

  public setKey(key: string): Task<Type> {
    this.subject.setKey(key);

    return this;
  }

  public getNext(): number | null {
    return this.next;
  }

  public getParent(): number | null {
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
