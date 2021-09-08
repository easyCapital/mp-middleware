import { ContentType, Image } from '.';

interface SupplierInterface {
  toJSON(): any;
}

export default class Supplier extends ContentType implements SupplierInterface {
  private name?: string;
  private logo?: Image;
  private link?: string;

  constructor(json: any) {
    super(json);

    if (json.data.name && json.data.name.length > 0) {
      this.name = json.data.name[0].text;
    }

    if (json.data.logo) {
      this.logo = new Image(json.data.logo);
    }

    if (json.data.link) {
      this.link = json.data.link.url;
    }
  }

  public toJSON(): any {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      logo: this.logo?.toJSON(),
      link: this.link,
    };
  }
}
