import { PropositionContent as JsonPropositionContentInterface } from '@robinfinance/js-api';

interface PropositionContentInterface {
  toJSON(): JsonPropositionContentInterface;
  setAmount(amount: number): PropositionContent;
}

export default class PropositionContent implements PropositionContentInterface {
  private id: number;
  private productIdentifier: string;
  public amount: number;
  private product: number;

  constructor(json: any) {
    this.id = json.id || json.product;
    this.amount = json.amount;
    this.product = json.product;
    this.productIdentifier = json.product_identifier;
  }

  public toJSON(): JsonPropositionContentInterface {
    return {
      id: this.id,
      amount: this.amount,
      product: this.product,
      productIdentifier: this.productIdentifier,
    };
  }

  public getAmount(): number | undefined {
    return this.amount;
  }

  public setAmount(amount: number): PropositionContent {
    this.amount = amount;

    return this;
  }
}
