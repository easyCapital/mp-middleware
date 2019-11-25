import { Contract as JsonContractInterface } from '@robinfinance/js-api';

import { Task } from '.';

interface ContractInterface {
  toJSON(): JsonContractInterface;
}

export default class Contract implements ContractInterface {
  private id: number;
  private name: string;
  private product: string;
  private initialDeposit: number;
  private subscriptionFee: number;
  private totalAmount: number;
  private includedSubscriptionFee: boolean;
  private tasks: Task[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.product = json.product.identifier;
    this.initialDeposit = json.initial_deposit;
    this.subscriptionFee = json.subscription_fee;
    this.totalAmount = json.total_amount;
    this.includedSubscriptionFee = json.is_included_subscription_fee;
  }

  public toJSON(): JsonContractInterface {
    return {
      id: this.id,
      name: this.name,
      product: this.product,
      initialDeposit: this.initialDeposit,
      subscriptionFee: this.subscriptionFee,
      totalAmount: this.totalAmount,
      includedSubscriptionFee: this.includedSubscriptionFee,
      tasks: this.tasks.map(item => item.toJSON()),
    };
  }

  public getId(): number {
    return this.id;
  }

  public setTasks(tasks: Task[]): Contract {
    this.tasks = tasks;

    return this;
  }
}
