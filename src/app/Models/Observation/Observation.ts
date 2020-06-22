import { Observation as JsonObservationInterface, ObservationCategories } from '@robinfinance/js-api';
import { ObservationCategoryMapper } from '../../Mappers/Observation';

interface ObservationInterface {
  toJSON(): JsonObservationInterface;
}

export default class Observation implements ObservationInterface {
  private id: number;
  private text: string;
  private order: number;
  private category?: ObservationCategories;

  constructor(json: any) {
    this.id = json.id;
    this.text = json.text;
    this.order = json.display_order;
    this.category = ObservationCategoryMapper.transformValue(json.category);
  }

  public toJSON(): JsonObservationInterface {
    return {
      id: this.id,
      text: this.text,
      order: this.order,
      category: this.category,
    };
  }
}
