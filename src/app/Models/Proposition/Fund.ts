import { Fund as JsonFundInterface, FundType } from 'mieuxplacer-js-api';

import { FundTypeMapper } from '../../Mappers/Proposition';

interface FundInterface {
  toJSON(): JsonFundInterface;
  setWeight(wieght: number): Fund;
}

export default class Fund implements FundInterface {
  private id: number;
  private weight?: number;
  private isin: string;
  private name: string;
  private type: FundType | null;
  private morningStarId: string;
  private diciUrl?: string;
  private srri: number;
  private grade?: number;
  private performance?: number;
  private price?: number;

  constructor(json: any) {
    this.id = json.id;
    this.isin = json.isin;
    this.name = json.name;
    this.type = FundTypeMapper.transformValue(json.line_type);
    this.morningStarId = json.id_morningstar;
    this.srri = json.srri;
    this.grade = json.ms_scoring_overall;
    this.performance = json.annualized_return_36m;
    this.price = json.line_price;
  }

  public toJSON(): JsonFundInterface {
    return {
      id: this.id,
      name: this.name,
      isin: this.isin,
      type: this.type,
      grade: this.grade,
      morningStarId: this.morningStarId,
      diciUrl: this.diciUrl,
      performance: this.performance,
      srri: this.srri,
      partPrice: this.price,
      weight: this.weight,
    };
  }

  public setWeight(weight: number): Fund {
    this.weight = weight;

    return this;
  }
}
