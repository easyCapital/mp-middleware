import { Task as JsonContractTaskInterface, TaskStatus, TaskStatuses, TaskType, TaskTypes } from '@robinfinance/js-api';

interface ContractTaskInterface {
  toJSON(): JsonContractTaskInterface;
}

export default class ContractTask implements ContractTaskInterface {
  private type: TaskType;
  private status: TaskStatus;
  private order;

  constructor(json: any) {
    this.type = TaskTypes[json.subject.type_name.toUpperCase()];
    this.status = TaskStatuses[json.status_name.toUpperCase()];
    this.order = json.id;
  }

  public toJSON(): JsonContractTaskInterface {
    return {
      status: this.status,
      type: this.type,
      order: this.order,
    };
  }
}
