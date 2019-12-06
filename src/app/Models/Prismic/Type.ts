import { Type as JsonTypeInterface, Gender } from '@robinfinance/js-api';

import { ContentType, Image, Paragraphs } from '.';
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
  private gender?: Gender;
  private description: string;
  private icon: Image;
  private recommandationExplanations: Paragraphs[];
  private attentionPoints: Paragraphs;
  private allocationExplanations: any;

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
    this.recommandationExplanations = json.data.recommandation_explanations.map(
      (item: any) => new Paragraphs(item.recommandation_explanation_text),
    );
    this.attentionPoints = new Paragraphs(json.data.attention_points);
    this.allocationExplanations = json.data.allocation_explanations.map(item => {
      return { type: item.explanation_type, value: new Paragraphs(item.explanation_value) };
    });
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
      recommandationExplanations: this.recommandationExplanations.map(item => item.toJSON()),
      attentionPoints: this.attentionPoints.toJSON(),
      allocationExplanations: this.allocationExplanations.map(item => {
        return {
          type: item.type,
          value: item.value.toJSON(),
        };
      }),
    };
  }
}
