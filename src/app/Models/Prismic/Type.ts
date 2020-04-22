import { Type as JsonTypeInterface, Gender } from '@robinfinance/js-api';

import { ContentType, Image } from '.';
import { Slice, RichText } from './Elements';
import { GenderMapper } from '../../Mappers/Prismic';

interface TypeInterface {
  toJSON(): JsonTypeInterface;
}

export default class Type extends ContentType implements TypeInterface {
  private gaTitle?: string;
  private label?: string;
  private labelSingular?: string;
  private labelPlural?: string;
  private labelDemonstrative?: string;
  private gender?: Gender;
  private description?: string;
  private explanation?: string;
  private tooltip?: string;
  private icon?: Image;
  private color?: string;
  private backgroundColor?: string;
  private recommandationExplanations?: RichText[][];
  private attentionPoints?: RichText[];
  private mandatoryInformation?: RichText[];
  private allocationExplanations?: { type: string; value: RichText[] }[];
  private blocks?: Slice[];

  constructor(json: any) {
    super(json);

    this.gaTitle = json.data.ga_page_name;
    this.labelSingular = json.data.label_singular;
    this.labelPlural = json.data.label_plural;
    this.labelDemonstrative = json.data.label_demonstrative;
    this.description = json.data.description;
    this.explanation = json.data.explanation;
    this.tooltip = json.data.tooltip;
    this.color = json.data.color;
    this.backgroundColor = json.data.background_color;

    if (json.data.label && json.data.label.length > 0) {
      this.label = json.data.label[0].text;
    }

    if (json.data.gender) {
      this.gender = GenderMapper.transformValue(json.data.gender);
    }

    if (json.data.icon) {
      this.icon = new Image(json.data.icon);
    }

    if (json.data.attention_points) {
      this.attentionPoints = json.data.attention_points
        .filter((item) => item.text.length > 0)
        .map((item) => new RichText(item));
    }

    if (json.data.mandatory_information) {
      this.mandatoryInformation = json.data.mandatory_information
        .filter((item) => item.text.length > 0)
        .map((item) => new RichText(item));
    }

    if (json.data.recommandation_explanations) {
      this.recommandationExplanations = json.data.recommandation_explanations.map((item: any) =>
        item.recommandation_explanation_text
          .filter((element) => element.text.length > 0)
          .map((element) => new RichText(element)),
      );
    }

    if (json.data.allocation_explanations) {
      this.allocationExplanations = json.data.allocation_explanations.map((item) => {
        return {
          type: item.explanation_type,
          value: item.explanation_value
            .filter((element) => element.text.length > 0)
            .map((element) => new RichText(element)),
        };
      });
    }

    if (json.data.body) {
      this.blocks = [];

      json.data.body.forEach((item) => {
        this.blocks?.push(new Slice(item));
      });
    }
  }

  public toJSON(): JsonTypeInterface {
    return {
      id: this.id,
      slug: this.slug,
      updatedAt: this.updated,
      gaTitle: this.gaTitle,
      label: this.label,
      labelSingular: this.labelSingular,
      labelPlural: this.labelPlural,
      labelDemonstrative: this.labelDemonstrative,
      gender: this.gender,
      description: this.description,
      explanation: this.explanation,
      tooltip: this.tooltip,
      icon: this.icon?.toJSON(),
      color: this.color,
      backgroundColor: this.backgroundColor,
      recommandationExplanations: this.recommandationExplanations?.map((item) =>
        item.map((element) => element.toJSON()),
      ),
      attentionPoints: this.attentionPoints?.map((item) => item.toJSON()),
      mandatoryInformation: this.mandatoryInformation?.map((item) => item.toJSON()),
      allocationExplanations: this.allocationExplanations?.map((item) => {
        return {
          type: item.type,
          value: item.value.map((element) => element.toJSON()),
        };
      }),
      blocks: this.blocks?.map((item) => item.toJSON()),
    };
  }
}
