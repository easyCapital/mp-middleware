import { Contract as JsonContractInterface, ContractStatus } from '@robinfinance/js-api';

import { ContractStatusMapper } from '../../Mappers/Contract';
import { Task } from '../Task';

interface ContractInterface {
  toJSON(): JsonContractInterface;
}

export default class Contract implements ContractInterface {
  private id: number;
  private name: string;
  private product: string;
  private status?: ContractStatus;
  private initialDeposit: number;
  private subscriptionFee: number;
  private subscriptionFeeRate?: number;
  private managementFeeRate?: number;
  private totalAmount: number;
  private includedSubscriptionFee: boolean;
  private proposition: number;
  private tasks: Task<any>[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.status = ContractStatusMapper.transformValue(json.status);
    this.product = json.product.identifier;
    this.initialDeposit = json.initial_deposit;
    this.subscriptionFee = json.subscription_fee;
    this.totalAmount = json.total_amount;
    this.includedSubscriptionFee = json.is_included_subscription_fee;
    this.proposition = json.proposition;

    if (json.subscription_fee_rate) {
      this.subscriptionFeeRate = json.subscription_fee_rate;
    }

    if (json.management_fee_rate) {
      this.managementFeeRate = json.management_fee_rate;
    }
  }

  public toJSON(): JsonContractInterface {
    return {
      id: this.id,
      name: this.name,
      product: this.product,
      status: this.status,
      initialDeposit: this.initialDeposit,
      subscriptionFee: this.subscriptionFee,
      subscriptionFeeRate: this.subscriptionFeeRate,
      managementFeeRate: this.managementFeeRate,
      totalAmount: this.totalAmount,
      includedSubscriptionFee: this.includedSubscriptionFee,
      proposition: this.proposition,
      tasks: this.tasks.map((item) => item.toJSON()),
    };
  }

  public getId(): number {
    return this.id;
  }

  public setTasks(tasks: Task<any>[]): Contract {
    this.tasks = tasks;

    return this;
  }
}
