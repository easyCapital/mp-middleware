import { Paragraphs as JsonParagraphsInterface } from '@robinfinance/js-api';
import { RichText } from '.';

export default class Paragraphs {
  public paragraphs: RichText[];

  constructor(json: any) {
    this.paragraphs = json.map(item => new RichText(item));
  }

  public toJSON(): JsonParagraphsInterface {
    return {
      paragraphs: this.paragraphs.map(item => item.toJSON()),
    };
  }
}
