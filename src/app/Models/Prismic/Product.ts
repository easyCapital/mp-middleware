import { Product as JsonProductInterface } from 'mieuxplacer-js-api';

import { ContentType, Type, Supplier, RichText } from '.';
import { BooleanMapper } from '../../Mappers/Prismic';

interface ProductInterface {
  toJson(): JsonProductInterface;
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
  private type?: Type;
  private supplier?: Supplier;

  constructor(json: any) {
    super(json);

    this.identifier = json.data.backend_id;
    this.title = json.data.page_title;
    this.gaTitle = json.data.ga_page_name;
    this.metaDescription = json.data.meta_description;
    this.subscribable = BooleanMapper.transformValue(json.data.subscribable);
    this.order = json.data.order;

    if (json.summary && json.summary.length > 0) {
      this.summary = [];

      json.summary.map(item => new RichText(item));
    }

    if (json.description && json.description.length > 0) {
      this.description = [];

      json.description.map(item => new RichText(item));
    }
  }

  public toJson(): JsonProductInterface {
    return {
      id: this.id,
      slug: this.slug,
      identifier: this.identifier,
      title: this.title,
      gaTitle: this.gaTitle,
      metaDescription: this.metaDescription,
      summary: this.summary && this.summary.map(item => item.toJson()),
      description: this.description && this.description.map(item => item.toJson()),
      subscribable: this.subscribable,
      order: this.order,
      type: this.type && this.type.toJson(),
      supplier: this.supplier && this.supplier.toJson(),
    };
  }
}
