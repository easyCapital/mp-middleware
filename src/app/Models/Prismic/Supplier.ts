import { Supplier as JsonSupplierInterface } from '@robinfinance/js-api';

import { ContentType, Image } from '.';

interface SupplierInterface {
  toJSON(): JsonSupplierInterface;
}

export default class Supplier extends ContentType implements SupplierInterface {
  private name: string;
  private logo: Image;
  private link: string;

  constructor(json: any) {
    super(json);

    this.name = json.data.name[0].text;
    this.logo = new Image(json.data.logo);
    this.link = json.data.link.url;
  }

  public toJSON(): JsonSupplierInterface {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      logo: this.logo.toJSON(),
      link: this.link,
    };
  }
}
