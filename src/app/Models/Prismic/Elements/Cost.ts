import { Cost as JsonCostInterface } from '@robinfinance/js-api';

interface CostInterface {
  toJSON(): JsonCostInterface;
}

export default class Cost implements CostInterface {
  private label: string;
  private value: string;
  private annotation?: string;

  constructor(json: any) {
    this.label = json.cost_label;
    this.value = json.cost_value;
    this.annotation = json.cost_annotation;
  }

  public toJSON(): JsonCostInterface {
    return {
      label: this.label,
      value: this.value,
      annotation: this.annotation,
    };
  }
}
