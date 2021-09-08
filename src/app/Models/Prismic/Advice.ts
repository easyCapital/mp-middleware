import { ContentType, RichText } from '.';

interface AdviceInterface {
  toJSON(): any;
}

export default class Advice extends ContentType implements AdviceInterface {
  private label: string;
  private tooltip: string;
  private content?: RichText[];

  constructor(json: any) {
    super(json);

    this.label = json.data.label;
    this.tooltip = json.data.tooltip;

    if (json.data.content && json.data.content.length > 0) {
      this.content = json.data.content.filter((item) => item.text.length > 0).map((item) => new RichText(item));
    }
  }

  public toJSON(): any {
    return {
      id: this.id,
      label: this.label,
      tooltip: this.tooltip,
      content: this.content?.map((item) => item.toJSON()),
    };
  }
}
