import { PrismicProduct as JsonProductInterface } from '@robinfinance/js-api';

import { ContentType, Type, Supplier, RichText, Cost, TDVM, Image, Link, Slice } from '.';
import { BooleanMapper } from '../../Mappers/Prismic';

interface ProductInterface {
  toJSON(): JsonProductInterface;
  setType(type?: Type): Product;
  setSupplier(supplier?: Supplier): Product;
}

export default class Product extends ContentType implements ProductInterface {
  private identifier?: string;
  private title?: string;
  private gaTitle?: string;
  private metaDescription?: string;
  private summary?: RichText[];
  private description?: RichText[];
  private type?: Type | string;
  private supplier?: Supplier | string;
  private objectives?: string[];
  private subscribable?: boolean;
  private order?: number;
  private riskLevel?: number;
  private maximumRate?: number;
  private riskLevelEnabled?: boolean;
  private availableForSubscription?: boolean;
  private investPeriod?: number;
  private investPeriodLabel?: string;
  private withdrawLimit?: string;
  private guaranteedCapital?: string;
  private subscriptionPeriod?: string;
  private minimumInvestment?: number;
  private taxeExemptionRate?: string;
  private investmentPeriod?: string;
  private calandlyLabel?: string;
  private calendlyUrl?: string;
  private listingFirstFeatureLabel?: string;
  private listingFirstFeatureValue?: string;
  private performancesLabel?: string;
  private performancesTooltip?: string;
  private yield?: string;
  private levelOfTaxAdvantage?: string;
  private riskProfiles?: string[];
  private investorTypologies?: string[];
  private managementModes?: string[];
  private taxSystems?: string[];
  private costs?: Cost[];
  private supplierConditions?: RichText[];
  private tdvms?: TDVM[];
  private recommendation?: RichText[];
  private investmentDestination?: RichText[];
  private returnedBonusesAlert?: RichText[];
  private performance?: RichText[];
  private subscriptionDocument?: Link;
  private subscriptionCalendly?: Link;
  private performances?: { label: string; value: string }[];
  private oneTimeFees?: { label: string; value: string }[];
  private annualFees?: { label: string; value: string }[];
  private occupancyRates?: { label: string; value: string }[];
  private distributedIncomesPerUnit?: { label: string; value: string }[];
  private bonuses?: { title: string; description: RichText[] }[];
  private rewards?: { label: string; image: Image }[];
  private blocks?: Slice[];

  constructor(json: any) {
    super(json);

    this.identifier = json.data.backend_key;
    this.gaTitle = json.data.ga_page_name;
    this.metaDescription = json.data.meta_description;

    if (json.data.title && json.data.title.length > 0) {
      this.title = json.data.title[0].text;
    }

    if (json.data.type) {
      this.type = json.data.type.id;
    }

    if (json.data.supplier) {
      this.supplier = json.data.supplier.id;
    }

    if (json.data.subscribable) {
      this.subscribable = BooleanMapper.transformValue(json.data.subscribable);
    }

    if (json.data.available_for_slection) {
      this.availableForSubscription = BooleanMapper.transformValue(json.data.available_for_slection);
    }

    if (json.data.risk_level_disabled) {
      this.riskLevelEnabled = json.data.risk_level_disabled === 'Activer';
    }

    if (json.data.order) {
      this.order = json.data.order;
    }

    if (json.data.risk_level) {
      this.riskLevel = json.data.risk_level;
    }

    if (json.data.maximum_rate) {
      this.maximumRate = json.data.maximum_rate;
    }

    if (json.data.invest_period) {
      this.investPeriod = json.data.invest_period;
    }

    if (json.data.invest_period_label) {
      this.investPeriodLabel = json.data.invest_period_label;
    }

    if (json.data.withdraw_limite) {
      this.withdrawLimit = json.data.withdraw_limite;
    }

    if (json.data.guaranteed_capital) {
      this.guaranteedCapital = json.data.guaranteed_capital;
    }

    if (json.data.subscription_period) {
      this.subscriptionPeriod = json.data.subscription_period;
    }

    if (json.data.minimum_investment) {
      this.minimumInvestment = json.data.minimum_investment;
    }

    if (json.data.taxe_exemption_rate) {
      this.taxeExemptionRate = json.data.taxe_exemption_rate;
    }

    if (json.data.investment_period) {
      this.investmentPeriod = json.data.investment_period;
    }

    if (json.data.calandly_label) {
      this.calandlyLabel = json.data.calandly_label;
    }

    if (json.data.calendly_url && json.data.calendly_url.url) {
      this.calendlyUrl = json.data.calendly_url.url;
    }

    if (json.data.performance___rendement___taux_d_occupation___revenu_distribue___tdvm__title) {
      this.listingFirstFeatureLabel =
        json.data.performance___rendement___taux_d_occupation___revenu_distribue___tdvm__title;
    }

    if (json.data.performance___rendement___taux_d_occupation___revenu_distribue___tdvm__title__default_value) {
      this.listingFirstFeatureValue =
        json.data.performance___rendement___taux_d_occupation___revenu_distribue___tdvm__title__default_value;
    }

    if (json.data.product_performances_label) {
      this.performancesLabel = json.data.product_performances_label;
    }

    if (json.data.product_performances_tooltip) {
      this.performancesTooltip = json.data.product_performances_tooltip;
    }

    if (json.data.yield) {
      this.yield = json.data.yield;
    }

    if (json.data.level_of_tax_advantage) {
      this.levelOfTaxAdvantage = json.data.level_of_tax_advantage;
    }

    if (json.data.summary && json.data.summary.length > 0) {
      this.summary = json.data.summary.filter((item) => item.text.length > 0).map((item) => new RichText(item));
    }

    if (json.data.description && json.data.description.length > 0) {
      this.description = json.data.description.filter((item) => item.text.length > 0).map((item) => new RichText(item));
    }

    if (json.data.objectives && json.data.objectives.length > 0) {
      this.objectives = [];

      json.data.objectives.forEach((item) => {
        if (item.objective) {
          this.objectives?.push(item.objective.id);
        }
      });
    }

    if (json.data.risk_profiles && json.data.risk_profiles.length > 0) {
      this.riskProfiles = [];

      json.data.risk_profiles.forEach((item) => {
        if (item.risk_profile) {
          this.riskProfiles?.push(item.risk_profile);
        }
      });
    }

    if (json.data.investor_typologies && json.data.investor_typologies.length > 0) {
      this.investorTypologies = [];

      json.data.investor_typologies.forEach((item) => {
        if (item.investor_typology) {
          this.investorTypologies?.push(item.investor_typology);
        }
      });
    }

    if (json.data.management_modes && json.data.management_modes.length > 0) {
      this.managementModes = [];

      json.data.management_modes.forEach((item) => {
        if (item.management_mode) {
          this.managementModes?.push(item.management_mode);
        }
      });
    }

    if (json.data.tax_systems && json.data.tax_systems.length > 0) {
      this.taxSystems = [];

      json.data.tax_systems.forEach((item) => {
        if (item.tax_system) {
          this.taxSystems?.push(item.tax_system);
        }
      });
    }

    if (json.data.costs && json.data.costs.length > 0) {
      this.costs = json.data.costs.map((item) => new Cost(item));
    }

    if (json.data.supplier_conditions && json.data.supplier_conditions.length > 0) {
      this.supplierConditions = json.data.supplier_conditions
        .filter((item) => item.text.length > 0)
        .map((item) => new RichText(item));
    }

    if (json.data.tdvm && json.data.tdvm.length > 0) {
      this.tdvms = json.data.tdvm.map((item) => new TDVM(item));
    }

    if (json.data.recommandation) {
      this.recommendation = json.data.recommandation
        .filter((item) => item.text.length > 0)
        .map((item) => new RichText(item));
    }

    if (json.data.investment_destination) {
      this.investmentDestination = json.data.investment_destination
        .filter((item) => item.text.length > 0)
        .map((item) => new RichText(item));
    }

    if (json.data.listing__returned_bonuses) {
      this.returnedBonusesAlert = json.data.listing__returned_bonuses
        .filter((item) => item.text.length > 0)
        .map((item) => new RichText(item));
    }

    if (json.data.performance) {
      this.performance = json.data.performance.filter((item) => item.text.length > 0).map((item) => new RichText(item));
    }

    if (json.data.information_document) {
      this.subscriptionDocument = new Link(json.data.information_document);
    }

    if (json.data.subscription_calendly) {
      this.subscriptionCalendly = new Link(json.data.subscription_calendly);
    }

    if (json.data.product_performances) {
      this.performances = [];

      json.data.product_performances.forEach((item) => {
        if (item.product_performance_label && item.product_performance_value) {
          this.performances?.push({
            label: item.product_performance_label,
            value: item.product_performance_value,
          });
        }
      });
    }

    if (json.data.one_time_fees) {
      this.oneTimeFees = [];

      json.data.one_time_fees.forEach((item) => {
        if (item.fee_label && item.fee_value) {
          this.oneTimeFees?.push({
            label: item.fee_label,
            value: item.fee_value,
          });
        }
      });
    }

    if (json.data.annual_fees) {
      this.annualFees = [];

      json.data.annual_fees.forEach((item) => {
        if (item.fee_label && item.fee_value) {
          this.annualFees?.push({
            label: item.fee_label,
            value: item.fee_value,
          });
        }
      });
    }

    if (json.data.occupancy_rate) {
      this.occupancyRates = [];

      json.data.occupancy_rate.forEach((item) => {
        if (item.occupancy_rate_label && item.occupancy_rate_value) {
          this.occupancyRates?.push({
            label: item.occupancy_rate_label,
            value: item.occupancy_rate_value,
          });
        }
      });
    }

    if (json.data.distributed_income_per_unit) {
      this.distributedIncomesPerUnit = [];

      json.data.distributed_income_per_unit.forEach((item) => {
        if (item.distributed_income_per_unit_label && item.distributed_income_per_unit_value) {
          this.distributedIncomesPerUnit?.push({
            label: item.distributed_income_per_unit_label,
            value: item.distributed_income_per_unit_value,
          });
        }
      });
    }

    if (json.data.bonusses) {
      this.bonuses = [];

      json.data.bonusses.forEach((item) => {
        if (item.bonus_description) {
          this.bonuses?.push({
            title: item.bonus_title,
            description: item.bonus_description
              .filter((element) => element.text.length > 0)
              .map((element) => new RichText(element)),
          });
        }
      });
    }

    if (json.data.rewards) {
      this.rewards = [];

      json.data.rewards.forEach((item) => {
        if (item.reward_label) {
          this.rewards?.push({
            label: item.reward_label,
            image: new Image(item.reward_image),
          });
        }
      });
    }

    if (json.data.body) {
      this.blocks = [];

      json.data.body.forEach((item) => {
        this.blocks?.push(new Slice(item));
      });
    }
  }

  public toJSON(): JsonProductInterface {
    return {
      id: this.id,
      slug: this.slug,
      updatedAt: this.updated,
      identifier: this.identifier,
      title: this.title,
      gaTitle: this.gaTitle,
      metaDescription: this.metaDescription,
      summary: this.summary?.map((item) => item.toJSON()),
      description: this.description?.map((item) => item.toJSON()),
      type: typeof this.type === 'string' ? this.type : this.type?.toJSON(),
      objectives: this.objectives,
      supplier: typeof this.supplier === 'string' ? this.supplier : this.supplier?.toJSON(),
      subscribable: this.subscribable,
      order: this.order,
      riskLevel: this.riskLevel,
      maximumRate: this.maximumRate,
      riskLevelEnabled: this.riskLevelEnabled,
      availableForSubscription: this.availableForSubscription,
      investPeriod: this.investPeriod,
      investPeriodLabel: this.investPeriodLabel,
      withdrawLimit: this.withdrawLimit,
      guaranteedCapital: this.guaranteedCapital,
      subscriptionPeriod: this.subscriptionPeriod,
      minimumInvestment: this.minimumInvestment,
      calandlyLabel: this.calandlyLabel,
      calendlyUrl: this.calendlyUrl,
      listingFirstFeatureLabel: this.listingFirstFeatureLabel,
      listingFirstFeatureValue: this.listingFirstFeatureValue,
      performancesLabel: this.performancesLabel,
      performancesTooltip: this.performancesTooltip,
      yield: this.yield,
      levelOfTaxAdvantage: this.levelOfTaxAdvantage,
      riskProfiles: this.riskProfiles,
      investorTypologies: this.investorTypologies,
      managementModes: this.managementModes,
      taxSystems: this.taxSystems,
      costs: this.costs && this.costs.map((item) => item.toJSON()),
      taxeExemptionRate: this.taxeExemptionRate,
      investmentPeriod: this.investmentPeriod,
      supplierConditions: this.supplierConditions?.map((item) => item.toJSON()),
      tdvms: this.tdvms?.map((item) => item.toJSON()),
      recommendation: this.recommendation?.map((item) => item.toJSON()),
      investmentDestination: this.investmentDestination?.map((item) => item.toJSON()),
      returnedBonusesAlert: this.returnedBonusesAlert?.map((item) => item.toJSON()),
      performance: this.performance?.map((item) => item.toJSON()),
      subscriptionDocument: this.subscriptionDocument?.toJSON(),
      subscriptionCalendly: this.subscriptionCalendly?.toJSON(),
      performances: this.performances,
      oneTimeFees: this.oneTimeFees,
      annualFees: this.annualFees,
      occupancyRates: this.occupancyRates,
      distributedIncomesPerUnit: this.distributedIncomesPerUnit,
      bonuses: this.bonuses?.map((item) => ({
        title: item.title,
        description: item.description.map((element) => element.toJSON()),
      })),
      rewards: this.rewards?.map((item) => ({
        label: item.label,
        image: item.image.toJSON(),
      })),
      blocks: this.blocks?.map((item) => item.toJSON()),
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
