import { Supplier as JsonSupplierInterface } from '@robinfinance/js-api';

interface SupplierInterface {
  toJSON(): JsonSupplierInterface;
}

export default class Supplier implements SupplierInterface {
  private id: number;
  private name: string;
  private slug: string;
  private logo?: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.slug = json.slug;
    this.logo = json.logo;
  }

  public toJSON(): JsonSupplierInterface {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      logo: this.logo,
    };
  }
}
