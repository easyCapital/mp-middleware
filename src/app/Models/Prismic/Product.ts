import { Product as JsonProductInterface } from 'mieuxplacer-js-api';

import { ContentType, Type, Supplier, RichText } from '.';
import { BooleanMapper } from '../../Mappers/Prismic';

interface ProductInterface {
  toJSON(): JsonProductInterface;
  setType(type?: Type): Product;
  setSupplier(supplier?: Supplier): Product;
}

export default class Product extends ContentType implements ProductInterface {
  private identifier?: string;
  private title: string;
  private gaTitle: string;
  private metaDescription: string;
  private summary?: RichText[];
  private description?: RichText[];
  private subscribable: boolean;
  private order: number;
  private type: Type | string;
  private supplier: Supplier | string;

  constructor(json: any) {
    super(json);

    this.identifier = json.data.backend_key;
    this.title = json.data.title[0].text;
    this.gaTitle = json.data.ga_page_name;
    this.metaDescription = json.data.meta_description;
    this.subscribable = BooleanMapper.transformValue(json.data.subscribable);
    this.order = json.data.order;
    this.type = json.data.type.id;
    this.supplier = json.data.supplier.id;

    if (json.data.summary && json.data.summary.length > 0) {
      this.summary = json.data.summary.map(item => new RichText(item));
    }

    if (json.data.description && json.data.description.length > 0) {
      this.description = json.data.description.map(item => new RichText(item));
    }
  }

  public toJSON(): JsonProductInterface {
    return {
      id: this.id,
      slug: this.slug,
      identifier: this.identifier,
      title: this.title,
      gaTitle: this.gaTitle,
      metaDescription: this.metaDescription,
      summary: this.summary && this.summary.map(item => item.toJSON()),
      description: this.description && this.description.map(item => item.toJSON()),
      subscribable: this.subscribable,
      order: this.order,
      type: typeof this.type === 'string' ? this.type : this.type.toJSON(),
      supplier: typeof this.supplier === 'string' ? this.supplier : this.supplier.toJSON(),
    };
  }

  public setType(type?: Type): Product {
    if (type) {
      this.type = type;
    }

    return this;
  }

  public setSupplier(supplier?: Supplier): Product {
    if (supplier) {
      this.supplier = supplier;
    }

    return this;
  }
}
