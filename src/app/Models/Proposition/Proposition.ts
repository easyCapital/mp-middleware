import { Proposition as JsonPropositionInterface, Answer } from 'mieuxplacer-js-api';

import { Portfolio } from '.';

interface PropositionInterface {
  toJson(): JsonPropositionInterface;
  addPortfolio(portfolio: Portfolio): void;
}

export default class Proposition implements PropositionInterface {
  private id: number;
  private created: string;
  private universe: string;
  private userId?: number;
  private userEmail?: string;
  private weightedSrri: number;
  private answers: Answer = {};
  private portfolios: Portfolio[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.created = json.created;
    this.universe = json.universe;
    this.weightedSrri = json.srri_weighted;

    if (json.user) {
      this.userId = json.user.id;
      this.userEmail = json.user.email;
    } else if (json.prospect) {
      this.userId = json.prospect.id;
      this.userEmail = json.prospect.email;
    }

    json.answers.forEach(answer => {
      if (this.answers[answer.question]) {
        const existingAnswer = this.answers[answer.question];

        this.answers[answer.question] = Array.isArray(existingAnswer)
          ? [...existingAnswer, answer.value]
          : [existingAnswer, answer.value];
      } else {
        this.answers[answer.question] = answer.value;
      }
    });
  }

  public toJson(): JsonPropositionInterface {
    return {
      id: this.id,
      created: this.created,
      universe: this.universe,
      userId: this.userId,
      userEmail: this.userEmail,
      weightedSrri: this.weightedSrri,
      answers: this.answers,
      portfolios: this.portfolios.map(portfolio => portfolio.toJson()),
    };
  }

  public addPortfolio(portfolio: Portfolio) {
    this.portfolios.push(portfolio);
  }
}
