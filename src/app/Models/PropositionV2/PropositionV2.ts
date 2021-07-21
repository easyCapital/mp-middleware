import { PropositionV2 as JsonPropositionV2Interface } from '@robinfinance/js-api';
import { PropositionContent } from '.';
interface PropositionV2Interface {
  toJSON(): JsonPropositionV2Interface;
}

export default class PropositionV2 implements PropositionV2Interface {
  public id: number;
  public created: string;
  public updated: string;
  public userId?: number;
  public contents: PropositionContent[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.created = json.created;
    this.updated = json.updated;
    this.userId = json.user.id;

    if (json.contents) {
      this.contents = json.contents.map((item) => new PropositionContent(item));
    }
  }

  public toJSON(): JsonPropositionV2Interface {
    return {
      id: this.id,
      created: this.created,
      updated: this.updated,
      userId: this.userId,
      contents: this.contents.map((content) => content.toJSON()),
      totalAmount: this.getAmount(),
    };
  }

  private getAmount(): number {
    let totalAmount = 0;
    this.contents.forEach((content) => {
      if (content.amount) {
        totalAmount += content.amount;
      }
    });
    return totalAmount;
  }
}
