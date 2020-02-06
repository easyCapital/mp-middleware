import { Formatting as JsonFormattingInterface, FormattingType } from '@robinfinance/js-api';

interface FormattingInterface {
  toJSON(): JsonFormattingInterface;
}

class Formatting implements FormattingInterface {
  private start: number;
  private end: number;
  private type: FormattingType;
  private data?: any;

  constructor(json: any) {
    this.start = json.start;
    this.end = json.end;
    this.type = json.type;

    if (json.data) {
      this.data = json.data;
    }
  }

  public toJSON(): JsonFormattingInterface {
    return {
      start: this.start,
      end: this.end,
      type: this.type,
      data: this.data,
    };
  }
}

export default Formatting;
