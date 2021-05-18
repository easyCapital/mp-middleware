import { Product as JsonProductInterface, ProductType } from '@robinfinance/js-api';

import { ProductTypeMapper } from '../../Mappers/Product';

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
  private slug: string;
  private type?: ProductType;
  private supplier: number;
  private minInvestment: number;
  private oneLinePortfolio: boolean;
  private hasEditableSubscriptionFeeRate: boolean;
  private hasEditableManagementFeeRate: boolean;
  private canSelectAmount: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.identifier = json.identifier;
    this.name = json.name;
    this.slug = json.slug;
    this.type = ProductTypeMapper.transformValue(json.product_type);
    this.supplier = json.supplier;
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
      slug: this.slug,
      type: this.type,
      supplier: this.supplier,
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
