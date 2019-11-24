import { Task as JsonContractTaskInterface, TaskStatus, TaskStatuses, TaskType, TaskTypes } from '@robinfinance/js-api';

interface ContractTaskInterface {
  toJSON(): JsonContractTaskInterface;
}

export default class ContractTask implements ContractTaskInterface {
  private type: TaskType;
  private status: TaskStatus;
  private order;

  constructor(json: any) {
    this.type = json.type;
    this.status = TaskStatuses[json.status.toUpperCase()];
    this.order = TaskTypes[json.order.toUpperCase()];
  }

  public toJSON(): JsonContractTaskInterface {
    return {
      status: this.status,
      type: this.type,
      order: this.order,
    };
  }
}
