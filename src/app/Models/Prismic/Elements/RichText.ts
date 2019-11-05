import { RichText as JsonRichTextInterface, RichTextType, FormattingType } from '@robinfinance/js-api';

interface RichTextInterface {
  toJSON(): JsonRichTextInterface;
}

export default class RichText implements RichTextInterface {
  private type: RichTextType;
  private text: string;
  private formatting: { start: number; end: number; type: FormattingType }[];

  constructor(json: any) {
    this.type = json.type;
    this.text = json.text;
    this.formatting = json.spans.map(item => ({ start: item.start, end: item.end, type: item.type }));
  }

  public toJSON(): JsonRichTextInterface {
    return {
      type: this.type,
      text: this.text,
      formatting: this.formatting,
    };
  }
}
