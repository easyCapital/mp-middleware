import { Product as JsonProductInterface } from '@robinfinance/js-api';

import { ContentType, Type, Supplier, RichText, Cost, TDVM, Paragraphs } from '.';
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
  private costs?: Cost[];
  private taxeExemptionRate?: string;
  private investmentPeriod?: string;
  private supplierConditions?: RichText[];
  private tdvms?: TDVM[];
  private recommendation?: Paragraphs;
  private investmentDestination?: Paragraphs;
  private performances?: any[];
  private oneTimeFees?: any[];
  private annualFees?: any[];
  private bonuses?: any[];
  private blocks?: any[];

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

    if (json.data.costs && json.data.costs.length > 0) {
      this.costs = json.data.costs.map(item => new Cost(item));
    }

    if (json.data.taxe_exemption_rate) {
      this.taxeExemptionRate = json.data.taxe_exemption_rate;
    }

    if (json.data.investment_period) {
      this.investmentPeriod = json.data.investment_period;
    }

    if (json.data.supplier_conditions && json.data.supplier_conditions.length > 0) {
      this.supplierConditions = json.data.supplier_conditions.map(item => new RichText(item));
    }

    if (json.data.tdvm && json.data.tdvm.length > 0) {
      this.tdvms = json.data.tdvm.map(item => new TDVM(item));
    }
    if (json.data.recommandation) {
      this.recommendation = new Paragraphs(json.data.recommandation);
    }
    if (json.data.investment_destination) {
      this.investmentDestination = new Paragraphs(json.data.investment_destination);
    }
    if (json.data.product_performances) {
      this.performances = json.data.product_performances.map(item => {
        return {
          label: item.product_performance_label,
          value: item.product_performance_value,
        };
      });
    }
    if (json.data.one_time_fees) {
      this.oneTimeFees = json.data.one_time_fees.map(item => {
        return {
          label: item.fee_label,
          value: item.fee_value,
        };
      });
    }
    if (json.data.annual_fees) {
      this.oneTimeFees = json.data.annual_fees.map(item => {
        return {
          label: item.fee_label,
          value: item.fee_value,
        };
      });
    }
    if (json.data.bonusses) {
      this.bonuses = json.data.bonusses.map(item => {
        return {
          title: item.bonus_title,
          description: new Paragraphs(item.bonus_description).toJSON(),
        };
      });
    }
    if (json.data.body) {
      this.blocks = json.data.body;
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
      type: typeof this.type === 'string' ? undefined : this.type.toJSON(),
      supplier: typeof this.supplier === 'string' ? undefined : this.supplier.toJSON(),
      costs: this.costs && this.costs.map(item => item.toJSON()),
      taxeExemptionRate: this.taxeExemptionRate,
      investmentPeriod: this.investmentPeriod,
      supplierConditions: this.supplierConditions && this.supplierConditions.map(item => item.toJSON()),
      tdvms: this.tdvms && this.tdvms.map(item => item.toJSON()),
      recommendation: this.recommendation && this.recommendation.toJSON(),
      investmentDestination: this.investmentDestination && this.investmentDestination.toJSON(),
      performances: this.performances,
      oneTimeFees: this.oneTimeFees,
      annualFees: this.annualFees,
      bonuses: this.bonuses,
      blocks: this.blocks,
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
