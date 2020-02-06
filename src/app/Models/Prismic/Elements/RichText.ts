import { RichText as JsonRichTextInterface, RichTextType } from '@robinfinance/js-api';

import Formatting from './Formatting';

interface RichTextInterface {
  toJSON(): JsonRichTextInterface;
}

export default class RichText implements RichTextInterface {
  private type: RichTextType;
  private text: string;
  private formatting: Formatting[];

  constructor(json: any) {
    this.type = json.type;
    this.text = json.text;
    this.formatting = json.spans.map(item => new Formatting(item));
  }

  public toJSON(): JsonRichTextInterface {
    return {
      type: this.type,
      text: this.text,
      formatting: this.formatting.map(item => item.toJSON()),
    };
  }
}
