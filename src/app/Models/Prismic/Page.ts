import { Page as JsonPageInterface } from '@robinfinance/js-api';

import { ContentType, Slice } from '.';

interface PageInterface {
  toJSON(): JsonPageInterface;
}

export default class Page extends ContentType implements PageInterface {
  private name: string;
  private title: string;
  private description: string;
  private gaTitle: string;
  private blocks: Slice[] = [];

  constructor(json: any) {
    super(json);

    this.name = json.data.page_name[0].text;
    this.title = json.data.page_title;
    this.description = json.data.page_description;
    this.gaTitle = json.data.ga_page_name;

    json.data.body.forEach(item => {
      this.blocks.push(new Slice(item));
    });
  }

  public toJSON(): JsonPageInterface {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      title: this.title,
      description: this.description,
      gaTitle: this.gaTitle,
      blocks: this.blocks.map(item => item.toJSON()),
    };
  }
}
