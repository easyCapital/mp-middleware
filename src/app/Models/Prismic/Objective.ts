import { Objective as JsonObjectiveInterface } from '@robinfinance/js-api';

import { ContentType, Image, Slice } from '.';

interface ObjectiveInterface {
  toJSON(): JsonObjectiveInterface;
}

export default class Objective extends ContentType implements ObjectiveInterface {
  private gaTitle: string;
  private metaDescription: string;
  private description: string = '';
  private label: string = '';
  private shortLabel: string = '';
  private answerId: string;
  private icon: Image;
  private homeIcon: Image;
  private blocks: Slice[] = [];

  constructor(json: any) {
    super(json);

    this.gaTitle = json.data.ga_page_name;
    this.metaDescription = json.data.meta_description;
    this.answerId = json.data.answer_id;
    this.icon = new Image(json.data.icon);
    this.homeIcon = new Image(json.data.home_icon);

    if (json.data.description && json.data.description.length > 0) {
      this.description = json.data.description[0].text;
    }

    if (json.data.label && json.data.label.length > 0) {
      this.label = json.data.label[0].text;
    }

    if (json.data.shorten_label && json.data.shorten_label.length > 0) {
      this.shortLabel = json.data.shorten_label[0].text;
    }

    json.data.body.forEach(item => {
      this.blocks.push(new Slice(item));
    });
  }

  public toJSON(): JsonObjectiveInterface {
    return {
      id: this.id,
      slug: this.slug,
      gaTitle: this.gaTitle,
      metaDescription: this.metaDescription,
      description: this.description,
      label: this.label,
      shortLabel: this.shortLabel,
      answerId: this.answerId,
      icon: this.icon.toJSON(),
      homeIcon: this.homeIcon.toJSON(),
      blocks: this.blocks.map(item => item.toJSON()),
    };
  }
}
