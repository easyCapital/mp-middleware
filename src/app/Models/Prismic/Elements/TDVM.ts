interface TDVMInterface {
  toJSON(): any;
}

export default class Cost implements TDVMInterface {
  private label: string;
  private value: string;

  constructor(json: any) {
    this.label = json.tdvm_label;
    this.value = json.tdvm_value;
  }

  public toJSON(): any {
    return {
      label: this.label,
      value: this.value,
    };
  }
}
