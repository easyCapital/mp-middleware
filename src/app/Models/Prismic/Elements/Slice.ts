interface SliceInterface {
  toJSON(): any;
}

export default class Slice implements SliceInterface {
  private label?: string;
  private type: any;
  private primary: any;
  private items: any[];

  constructor(json: any) {
    this.label = json.slice_label;
    this.type = json.slice_type;
    this.primary = json.primary;
    this.items = json.items;
  }

  public toJSON(): any {
    return {
      label: this.label,
      type: this.type,
      primary: this.primary,
      items: this.items,
    };
  }
}
