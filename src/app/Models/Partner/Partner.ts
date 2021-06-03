import { Partner as JsonPartnerInterface, Product } from '@robinfinance/js-api';

interface PartnerInterface {
  toJSON(): JsonPartnerInterface;
}

export default class Partner implements PartnerInterface {
  private id: number;
  private created: string;
  private updated: string;
  private cgp: number;
  private supplier: number;
  private products: Product[];

  constructor(json: any) {
    this.id = json.id;
    this.created = json.created;
    this.updated = json.updated;
    this.cgp = json.cgp;
    this.supplier = json.supplier;
    this.products = json.products;
  }

  public toJSON(): JsonPartnerInterface {
    return {
      id: this.id,
      created: this.created,
      updated: this.updated,
      cgp: this.cgp,
      supplier: this.supplier,
      products: this.products,
    };
  }
}
