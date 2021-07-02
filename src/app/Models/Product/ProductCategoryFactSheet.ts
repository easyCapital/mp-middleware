import { ProductCategoryFactSheet as JsonProductCategoryFactSheetInterface } from '@robinfinance/js-api';

interface ProductCategoryFactSheetInterface {
  toJSON(): JsonProductCategoryFactSheetInterface;
}

export default class ProductCategoryFactSheet implements ProductCategoryFactSheetInterface {
  private id: number;
  private cgp: number;
  private productCategory: number;
  private description: string;
  private mainCharacteristics: string;
  private advantages: string;
  private pointsForConsideration: string;

  constructor(json: any) {
    this.id = json.id;
    this.cgp = json.cgp;
    this.productCategory = json.product_category;
    this.description = json.description;
    this.advantages = json.advantages;
    this.pointsForConsideration = json.points_for_consideration;
    this.mainCharacteristics = json.main_characteristics;
  }

  public toJSON(): JsonProductCategoryFactSheetInterface {
    return {
      id: this.id,
      cgp: this.cgp,
      productCategory: this.productCategory,
      pointsForConsideration: this.pointsForConsideration,
      advantages: this.advantages,
      description: this.description,
      mainCharacteristics: this.mainCharacteristics,
    };
  }
}
