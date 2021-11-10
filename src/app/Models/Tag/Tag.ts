import { Tag as JsonTagInterface } from '@robinfinance/js-api';

interface TagInterface {
  toJSON(): JsonTagInterface;
}

export default class Tag implements TagInterface {
  private label: string;
  private color: string;

  constructor(json: any) {
    this.label = json.label;
    this.color = json.color;
  }

  public toJSON(): JsonTagInterface {
    return {
      label: this.label,
      color: this.color,
    };
  }
}
