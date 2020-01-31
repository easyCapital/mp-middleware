import { TaskSubject as JsonTaskSubjectInterfacte, TaskType } from '@robinfinance/js-api';

import { TaskTypeMapper } from '../../Mappers/Contract';

interface TaskSubjectInterfacte {
  toJSON(): JsonTaskSubjectInterfacte;
}

export default class TaskSubject implements TaskSubjectInterfacte {
  private key: string;
  private type?: TaskType;

  constructor(json: any) {
    this.key = json.key;
    this.type = TaskTypeMapper.transformValue(json.type);
  }

  public getType(): TaskType | undefined {
    return this.type;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): TaskSubject {
    this.key = key;

    return this;
  }

  public toJSON(): JsonTaskSubjectInterfacte {
    return {
      key: this.key,
      type: this.type,
    };
  }
}
