import { Home as JsonHomeInterface } from '@robinfinance/js-api';

import { ContentType, Slice } from '.';
import { RichText, Image, Link } from './Elements';

interface HomeInterface {
  toJSON(): JsonHomeInterface;
}

export default class Home extends ContentType implements HomeInterface {
  private title: string;
  private description: string;
  private gaTitle: string;
  private bannerIsActivated: boolean;
  private bannerText?: RichText[];
  private bannerIcon?: Image;
  private bannerLink?: Link;
  private bannerLinkText?: string;
  private bannerColor?: string;
  private blocks?: Slice[];

  constructor(json: any) {
    super(json);

    this.title = json.data.page_title;
    this.description = json.data.page_description;
    this.gaTitle = json.data.ga_page_name;
    this.bannerIsActivated = json.data.banner_activation === 'Afficher la bannière';
    this.bannerLinkText = json.data.banner_url_text;
    this.bannerColor = json.data.banner_color;

    if (json.data.banner_text) {
      this.bannerText = json.data.banner_text.filter((item) => item.text.length > 0).map((item) => new RichText(item));
    }

    if (json.data.banner_picto) {
      this.bannerIcon = new Image(json.data.banner_picto);
    }

    if (json.data.banner_link) {
      this.bannerLink = new Link(json.data.banner_link);
    }

    if (json.data.body) {
      this.blocks = [];

      json.data.body.forEach((item) => {
        this.blocks?.push(new Slice(item));
      });
    }
  }

  public toJSON(): JsonHomeInterface {
    return {
      id: this.id,
      updatedAt: this.updated,
      title: this.title,
      description: this.description,
      gaTitle: this.gaTitle,
      bannerIsActivated: this.bannerIsActivated,
      bannerText: this.bannerText?.map((item) => item.toJSON()),
      bannerIcon: this.bannerIcon?.toJSON(),
      bannerLink: this.bannerLink?.toJSON(),
      bannerLinkText: this.bannerLinkText,
      bannerColor: this.bannerColor,
      blocks: this.blocks?.map((item) => item.toJSON()),
    };
  }
}
