import { Portfolio as JsonPortfolioInterface } from '@robinfinance/js-api';

import { Fund } from '.';
import { Product } from '../Prismic';

interface PortfolioInterface {
  toJSON(): JsonPortfolioInterface;
  setProduct(product: Product): Portfolio;
  setSrri(srri: number): Portfolio;
  setAmount(amount: number): Portfolio;
  addFund(fund: Fund): Portfolio;
}

export default class Portfolio implements PortfolioInterface {
  private id: number;
  private productIdentifier?: string;
  private product?: Product;
  private amount?: number;
  private srri: number;
  private funds: any[] = [];
  private performances?: { [year: string]: number };

  constructor(json: any) {
    this.id = json.id || json.portfolio;
    this.srri = json.srri;

    if (json.amount) {
      this.amount = json.amount;
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
      productIdentifier: this.productIdentifier,
      product: this.product && this.product.toJSON(),
      amount: this.amount,
      srri: this.srri,
      funds: this.funds.map(fund => fund.toJSON()),
      performances: this.performances,
    };
  }

  public getId(): number {
    return this.id;
  }

  public setProduct(product: Product): Portfolio {
    if (product) {
      this.product = product;
    }

    return this;
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
}
