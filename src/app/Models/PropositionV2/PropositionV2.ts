import { PropositionV2 as JsonPropositionInterface } from '@robinfinance/js-api';

import { Answer } from '../Answer';

interface PropositionV2Interface {
  toJSON(): JsonPropositionInterface;
}

export default class PropositionV2 implements PropositionV2Interface {
  public configKey: string | undefined;
  private id: number;
  private created: string;
  private updated: string;
  private userId?: number;
  private userEmail?: string;
  private answers: Answer[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.created = json.created;
    this.updated = json.updated;

    if (json.user) {
      this.userId = json.user.id;
      this.userEmail = json.user.email;
    } else if (json.prospect) {
      this.userId = json.prospect.id;
      this.userEmail = json.prospect.email;
    }

    if (json.answers) {
      this.answers = json.answers.map((item) => new Answer(item));
    }

    if (json.contents) {
      console.log(json.contents);
    }

    this.configKey = json.config_key;
  }

  public toJSON(): JsonPropositionInterface {
    // const totalAmount = this.getAmount();
    return {
      id: this.id,
      created: this.created,
      updated: this.updated,
      userId: this.userId,
      userEmail: this.userEmail,
      answers: this.answers.map((item) => item.toJSON()),
      amount: 0,
    };
  }

  // private getAmount(): number {
  //   let totalAmount = 0;
  //   this.contents.forEach((portfolio) => {
  //     const portfolioAmount = portfolio.amount;
  //     if (portfolioAmount) {
  //       totalAmount += portfolioAmount;
  //     }
  //   });
  //   return totalAmount;
  // }

  public getAnswers(): Answer[] {
    return this.answers;
  }
}
