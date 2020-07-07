import { Option as JsonOptionInterface } from '@robinfinance/js-api';

interface OptionInterface {
  toJSON(): JsonOptionInterface;
}

export default class Option implements OptionInterface {
  public value: string;
  public label: string;
  private annotation?: string;
  private exclusive: boolean;
  private data?: any;

  constructor(json: any) {
    this.value = json.value;
    this.label = json.label;
    this.annotation = json.annotation;
    this.exclusive = json.exclusive;
    this.data = json.data;
  }

  public toJSON(): JsonOptionInterface {
    const json: JsonOptionInterface = {
      value: this.value,
      label: this.label,
      annotation: this.annotation,
      exclusive: this.exclusive,
    };

    if (this.data) {
      json.data = this.data;
    }

    return json;
  }
}
