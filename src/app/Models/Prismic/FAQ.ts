import { ContentType } from '.';
import { RichText } from './Elements';
import Image from './Elements/Image';

export default class FAQ extends ContentType {
  private title: string;
  private content: RichText[];
  private image?: Image;
  private order: number;

  constructor(json: any) {
    super(json);
    this.title = json.data.title[0].text;
    this.content = json.data.content.filter((item) => item.text.length > 0).map((item) => new RichText(item));
    if (json.data.imageurl) {
      this.image = new Image(json.data.imageurl);
    }
    this.order = json.data.order;
  }

  public toJSON(): any {
    return {
      id: this.id,
      slug: this.slug,
      updatedAt: this.updated,
      title: this.title,
      content: this.content.map((item) => item.toJSON()),
      image: this.image?.toJSON(),
      order: this.order,
    };
  }
}
