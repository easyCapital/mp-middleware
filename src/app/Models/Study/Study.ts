import { Study as JsonStudyInterface, StudyStatus } from '@robinfinance/js-api';

import { StudyStatusMapper } from '../../Mappers/Study';
import { Task } from '../Task';

interface StudyInterface {
  getId(): number;
  getTitle(): string;
  toJSON(): JsonStudyInterface;
}

export default class Study implements StudyInterface {
  private id: number;
  private title: string;
  private status?: StudyStatus;
  private created: Date;
  private updated: Date;
  private tasks: Task<any>[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.title = json.title;
    this.status = StudyStatusMapper.transformValue(json.status);
    this.created = json.created;
    this.updated = json.updated;

    if (json.tasks) {
      json.tasks.map((task) => {
        this.tasks.push(new Task(task));
      });
    }
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public toJSON(): JsonStudyInterface {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      created: this.created,
      updated: this.updated,
      tasks: this.tasks.map((item) => item.toJSON()),
    };
  }
}
