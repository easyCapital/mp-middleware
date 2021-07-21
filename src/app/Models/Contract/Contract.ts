import { Contract as JsonContractInterface, ContractStatus } from '@robinfinance/js-api';

import { ContractStatusMapper } from '../../Mappers/Contract';
import { Proposition } from '../Proposition';
import { PropositionV2 } from '../PropositionV2';

interface ContractInterface {
  toJSON(): JsonContractInterface;
}

export default class Contract implements ContractInterface {
  public id: number;
  public name: string;
  public product: string;
  public status?: ContractStatus;
  public initialDeposit: number;
  public subscriptionFee: number;
  public subscriptionFeeRate?: number;
  public managementFeeRate?: number;
  public totalAmount: number;
  public includedSubscriptionFee: boolean;
  public propositionId: number;
  public proposition?: Proposition | PropositionV2;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.status = ContractStatusMapper.transformValue(json.status);
    this.product = json.product.identifier;
    this.initialDeposit = json.initial_deposit;
    this.subscriptionFee = json.subscription_fee;
    this.totalAmount = json.total_amount;
    this.includedSubscriptionFee = json.is_included_subscription_fee;
    this.propositionId = json.proposition || json.proposition_v2;

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
      proposition: this.proposition?.toJSON(),
    };
  }

  public getId(): number {
    return this.id;
  }
}
