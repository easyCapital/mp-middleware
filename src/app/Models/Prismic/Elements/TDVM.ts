import { TDVM as JsonTDVMInterface } from '@robinfinance/js-api';

interface TDVMInterface {
  toJSON(): JsonTDVMInterface;
}

export default class Cost implements TDVMInterface {
  private label: string;
  private value: string;

  constructor(json: any) {
    this.label = json.tdvm_label;
    this.value = json.tdvm_value;
  }

  public toJSON(): JsonTDVMInterface {
    return {
      label: this.label,
      value: this.value,
    };
  }
}
