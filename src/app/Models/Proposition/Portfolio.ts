import { Portfolio as JsonPortfolioInterface } from 'mieuxplacer-js-api';

import { Fund } from '.';

interface PortfolioInterface {
  toJson(): JsonPortfolioInterface;
  getId(): number;
}

export default class Portfolio implements PortfolioInterface {
  private id: number;
  private productId: string;
  private product?: any;
  private amount: number;
  private srri: number;
  private funds: any[] = [];

  constructor(json: any) {
    this.id = json.portfolio;
    this.productId = json.product_identifier;
    this.amount = json.amount;
    this.srri = json.srri;
  }

  public toJson(): JsonPortfolioInterface {
    return {
      id: this.id,
      product: this.productId,
      amount: this.amount,
      srri: this.srri,
      funds: this.funds.map(fund => fund.toJson()),
    };
  }

  public getId(): number {
    return this.id;
  }

  public addFund(fund: Fund) {
    this.funds.push(fund);
  }
}
