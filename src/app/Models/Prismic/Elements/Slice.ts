import { Slice as JsonSliceInterface } from '@robinfinance/js-api';

interface SliceInterface {
  toJSON(): JsonSliceInterface;
}

export default class Slice implements SliceInterface {
  private label?: string;
  private type: string;
  private primary: any;
  private items: any[];

  constructor(json: any) {
    this.label = json.slice_label;
    this.type = json.slice_type;
    this.primary = json.primary;
    this.items = json.items;
  }

  public toJSON(): JsonSliceInterface {
    return {
      label: this.label,
      type: this.type,
      primary: this.primary,
      items: this.items,
    };
  }
}
