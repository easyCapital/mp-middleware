import { BackendProduct as JsonProductInterface } from '@robinfinance/js-api';

interface ProductInterface {
  toJSON(): JsonProductInterface;
  getId(): number;
  getIdentifier(): string;
  getName(): string;
}

export default class Product implements ProductInterface {
  private id: number;
  private identifier: string;
  private name: string;
  private minInvestment: number;
  private oneLinePortfolio: boolean;
  private hasEditableSubscriptionFeeRate: boolean;
  private hasEditableManagementFeeRate: boolean;
  private canSelectAmount: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.identifier = json.identifier;
    this.name = json.name;
    this.minInvestment = json.min_investment;
    this.oneLinePortfolio = json.one_line_portfolio;
    this.hasEditableSubscriptionFeeRate = json.is_editable_subscription_fee_rate;
    this.hasEditableManagementFeeRate = json.is_editable_management_fee_rate;
    this.canSelectAmount = json.can_select_amount;
  }

  public toJSON(): JsonProductInterface {
    return {
      id: this.id,
      identifier: this.identifier,
      name: this.name,
      minInvestment: this.minInvestment,
      oneLinePortfolio: this.oneLinePortfolio,
      hasEditableSubscriptionFeeRate: this.hasEditableSubscriptionFeeRate,
      hasEditableManagementFeeRate: this.hasEditableManagementFeeRate,
      canSelectAmount: this.canSelectAmount,
    };
  }

  public getId(): number {
    return this.id;
  }

  public getIdentifier(): string {
    return this.identifier;
  }

  public getName(): string {
    return this.name;
  }
}
