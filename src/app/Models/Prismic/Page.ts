import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { ContentType } from '.';

interface PageInterface {
  toJson(): JsonPageInterface;
}

export default class Page extends ContentType implements PageInterface {
  private name: string;
  private title: string;
  private description: string;
  private gaTitle: string;

  constructor(json: any) {
    super(json);

    this.name = json.data.page_name[0].text;
    this.title = json.data.page_title;
    this.description = json.data.page_description;
    this.gaTitle = json.data.ga_page_name;
  }

  public toJson(): JsonPageInterface {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      title: this.title,
      description: this.description,
      gaTitle: this.gaTitle,
    };
  }
}
