// import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { ContentType } from '.';

interface SupplierInterface {
  toJson(): any;
}

export default class Supplier extends ContentType implements SupplierInterface {
  constructor(json: any) {
    super(json);
  }

  public toJson(): any {
    return {
      id: this.id,
      slug: this.slug,
    };
  }
}
