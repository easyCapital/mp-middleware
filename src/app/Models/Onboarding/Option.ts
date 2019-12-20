import { Option as JsonOptionInterface } from '@robinfinance/js-api';

interface OptionInterface {
  toJSON(): JsonOptionInterface;
}

export default class Option implements OptionInterface {
  public value: string;
  public label: string;
  private exclusive: boolean;
  private data?: any;

  constructor(json: any) {
    this.value = json.value;
    this.label = json.label;
    this.exclusive = json.exclusive;
    this.data = json.data;
  }

  public toJSON(): JsonOptionInterface {
    const json: JsonOptionInterface = {
      value: this.value,
      exclusive: this.exclusive,
      label: this.label,
    };

    if (this.data) {
      json.data = this.data;
    }

    return json;
  }
}
