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
  private oneLinePortfolio: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.identifier = json.identifier;
    this.name = json.name;
    this.oneLinePortfolio = json.one_line_portfolio;
  }

  public toJSON(): JsonProductInterface {
    return {
      id: this.id,
      identifier: this.identifier,
      name: this.name,
      oneLinePortfolio: this.oneLinePortfolio,
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
