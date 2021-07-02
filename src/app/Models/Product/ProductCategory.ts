import { ProductCategory as JsonProductCategoryInterface, ProductCategoryType } from '@robinfinance/js-api';

import { ProductCategoryMapper } from '../../Mappers/Product';

interface ProductInterface {
  toJSON(): JsonProductCategoryInterface;
}

export default class ProductCategory implements ProductInterface {
  private id: number;
  private label: string;
  private slug: string;
  private type?: ProductCategoryType;

  constructor(json: any) {
    this.id = json.id;
    this.label = json.label;
    this.slug = json.slug;
    this.type = ProductCategoryMapper.transformValue(json.key);
  }

  public toJSON(): JsonProductCategoryInterface {
    return {
      id: this.id,
      label: this.label,
      slug: this.slug,
      type: this.type,
    };
  }
}
