import { Tag as JsonTagInterface } from '@robinfinance/js-api';

interface TagInterface {
  toJSON(): JsonTagInterface;
}

export default class Tag implements TagInterface {
  private id: number;
  private label: string;

  constructor(json: any) {
    this.id = json.id;
    this.label = json.label;
  }

  public toJSON(): JsonTagInterface {
    return {
      id: this.id,
      label: this.label,
    };
  }
}
