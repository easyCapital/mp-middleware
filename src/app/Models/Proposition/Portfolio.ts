import { Portfolio as JsonPortfolioInterface, FundTypes } from '@robinfinance/js-api';

import { Fund } from '.';

interface PortfolioInterface {
  toJSON(): JsonPortfolioInterface;
  setSrri(srri: number): Portfolio;
  setAmount(amount: number): Portfolio;
  addFund(fund: Fund): Portfolio;
}

export default class Portfolio implements PortfolioInterface {
  public amount?: number;
  private id: number;
  private productId?: number;
  private productIdentifier?: string;
  private srri: number;
  private funds: Fund[] = [];
  private performances?: { [year: string]: number };

  constructor(json: any) {
    this.id = json.id || json.portfolio;
    this.srri = json.srri;

    if (json.amount) {
      this.amount = json.amount;
    }

    if (json.product) {
      this.productId = json.product;
    }

    if (json.product_identifier) {
      this.productIdentifier = json.product_identifier;
    }

    if (json.performances && Object.keys(json.performances).length > 0) {
      this.performances = json.performances;
    }
  }

  public toJSON(): JsonPortfolioInterface {
    return {
      id: this.id,
      productId: this.productId,
      productIdentifier: this.productIdentifier,
      amount: this.amount,
      srri: this.srri,
      funds: this.funds.map((fund) => fund.toJSON()),
      performances: this.performances,
      guaranteedCapitalWeight: this.computeGuaranteedCapitalWeight(),
    };
  }

  public getId(): number {
    return this.id;
  }

  public setProductIdentifier(product: string): Portfolio {
    this.productIdentifier = product;

    return this;
  }

  public setSrri(srri: number): Portfolio {
    this.srri = srri;

    return this;
  }

  public getAmount(): number | undefined {
    return this.amount;
  }

  public setAmount(amount: number): Portfolio {
    this.amount = amount;

    return this;
  }

  public addFund(fund: Fund): Portfolio {
    this.funds.push(fund);

    return this;
  }

  private computeGuaranteedCapitalWeight(): number {
    let guaranteedCapitalWeight = 0;
    this.funds.forEach((fund) => {
      if (fund.type === FundTypes.EURO) {
        if (fund.weight) {
          guaranteedCapitalWeight += fund.weight;
        }
      }
    });
    return guaranteedCapitalWeight;
  }
}
