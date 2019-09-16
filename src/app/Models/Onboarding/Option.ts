import { Option as JsonOptionInterface } from 'mieuxplacer-js-api';

interface OptionInterface {
  toJson(): JsonOptionInterface;
}

export default class Option implements OptionInterface {
  private value: string;
  private label: string;
  private exclusive: boolean;
  private data?: any;

  constructor(json: any) {
    this.value = json.value;
    this.label = json.label;
    this.exclusive = json.exclusive;
    this.data = json.data;
  }

  public toJson(): JsonOptionInterface {
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
