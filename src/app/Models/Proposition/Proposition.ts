import { Proposition as JsonPropositionInterface, Answer, Origin, Origins } from '@robinfinance/js-api';

import { Portfolio } from '.';
import { Advice } from '../Prismic';

interface PropositionInterface {
  toJSON(): JsonPropositionInterface;
  setInvestorType(investorType: Advice): Proposition;
  addPortfolio(portfolio: Portfolio): Proposition;
}

export default class Proposition implements PropositionInterface {
  private id: number;
  private created: string;
  private universe: string;
  private userId?: number;
  private userEmail?: string;
  private origin: Origin;
  private token: string;
  private weightedSrri: number;
  private answers: Answer = {};
  private investorType?: Advice;
  private portfolios: Portfolio[] = [];
  private contracts: number[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.created = json.created;
    this.universe = json.universe;
    this.origin = json.cgp === null ? Origins.MIEUXPLACER : Origins.CGP;
    this.token = json.token;
    this.weightedSrri = json.srri_weighted;

    if (json.user) {
      this.userId = json.user.id;
      this.userEmail = json.user.email;
    } else if (json.prospect) {
      this.userId = json.prospect.id;
      this.userEmail = json.prospect.email;
    }

    if (json.answers) {
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

    if (json.contents) {
      json.contents.map(portfolio => {
        this.portfolios.push(new Portfolio(portfolio));
      });
    }

    if (json.contracts) {
      this.contracts = json.contracts;
    }
  }

  public toJSON(): JsonPropositionInterface {
    return {
      id: this.id,
      token: this.token,
      created: this.created,
      universe: this.universe,
      userId: this.userId,
      userEmail: this.userEmail,
      origin: this.origin,
      weightedSrri: this.weightedSrri,
      answers: this.answers,
      investorType: this.investorType && this.investorType.toJSON(),
      portfolios: this.portfolios.map(portfolio => portfolio.toJSON()),
      contracts: this.contracts,
    };
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): Proposition {
    this.token = token;

    return this;
  }

  public setInvestorType(investorType: Advice): Proposition {
    this.investorType = investorType;

    return this;
  }

  public setPortfolios(portfolios: Portfolio[]): Proposition {
    this.portfolios = portfolios;

    return this;
  }

  public addPortfolio(portfolio: Portfolio): Proposition {
    this.portfolios.push(portfolio);

    return this;
  }
}
