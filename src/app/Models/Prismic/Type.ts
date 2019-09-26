import { Type as JsonTypeInterface, Gender } from 'mieuxplacer-js-api';

import { ContentType, Image } from '.';
import { GenderMapper } from '../../Mappers/Prismic';

interface TypeInterface {
  toJSON(): JsonTypeInterface;
}

export default class Type extends ContentType implements TypeInterface {
  private gaTitle: string;
  private label: string;
  private labelSingular: string;
  private labelPlural: string;
  private labelDemonstrative: string;
  private gender: Gender | null;
  private description: string;
  private icon: Image;

  constructor(json: any) {
    super(json);

    this.gaTitle = json.data.ga_page_name;
    this.label = json.data.label[0].text;
    this.labelSingular = json.data.label_singular;
    this.labelPlural = json.data.label_plural;
    this.labelDemonstrative = json.data.label_demonstrative;
    this.gender = GenderMapper.transformValue(json.data.gender);
    this.description = json.data.description;
    this.icon = new Image(json.data.icon);
  }

  public toJSON(): JsonTypeInterface {
    return {
      id: this.id,
      slug: this.slug,
      gaTitle: this.gaTitle,
      label: this.label,
      labelSingular: this.labelSingular,
      labelPlural: this.labelPlural,
      labelDemonstrative: this.labelDemonstrative,
      gender: this.gender,
      description: this.description,
      icon: this.icon.toJSON(),
    };
  }
}
