import { ProductPartner as JsonProductPartnerInterface } from '@robinfinance/js-api';

interface ProductPartnerInterface {
  toJSON(): JsonProductPartnerInterface;
}

export default class ProductPartner implements ProductPartnerInterface {
  private id: number;
  private partner: number;
  private product: number;
  private attentionPoints: string;
  private benefits: string;
  private description: string;
  private mainCharacteristics: string;

  constructor(json: any) {
    this.id = json.id;
    this.partner = json.partner_id;
    this.product = json.product_id;
    this.attentionPoints = json.attention_points;
    this.benefits = json.benefits;
    this.description = json.description;
    this.mainCharacteristics = json.main_characteristics;
  }

  public toJSON(): JsonProductPartnerInterface {
    return {
      id: this.id,
      partner: this.partner,
      product: this.product,
      attentionPoints: this.attentionPoints,
      benefits: this.benefits,
      description: this.description,
      mainCharacteristics: this.mainCharacteristics,
    };
  }
}
