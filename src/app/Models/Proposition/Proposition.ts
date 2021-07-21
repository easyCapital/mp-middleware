import {
  Proposition as JsonPropositionInterface,
  PropositionPortfolio as JsonPropositionPortfolioInterface,
} from '@robinfinance/js-api';

import { Portfolio } from '.';
import { Answer } from '../Answer';

interface PropositionInterface {
  toJSON(): JsonPropositionInterface;
  addPortfolio(portfolio: Portfolio): Proposition;
}

export default class Proposition implements PropositionInterface {
  public configKey: string | undefined;
  public id: number;
  public created: string;
  public universe: string;
  public userId?: number;
  public userEmail?: string;
  public token: string;
  public weightedSrri: number;
  public answers: Answer[] = [];
  public portfolios: Portfolio[] = [];
  public contracts: number[] = [];

  constructor(json: any) {
    this.id = json.id;
    this.created = json.created;
    this.universe = json.universe;
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
      this.answers = json.answers.map((item) => new Answer(item));
    }

    if (json.contents) {
      json.contents.map((portfolio) => {
        this.portfolios.push(new Portfolio(portfolio));
      });
    }

    if (json.contracts) {
      this.contracts = json.contracts;
    }
    this.configKey = json.config_key;
  }

  public toJSON(): JsonPropositionInterface {
    const totalAmount = this.getAmount();
    return {
      id: this.id,
      token: this.token,
      created: this.created,
      universe: this.universe,
      userId: this.userId,
      userEmail: this.userEmail,
      weightedSrri: this.weightedSrri,
      answers: this.answers.map((item) => item.toJSON()),
      portfolios: this.portfolios.map((portfolio) => {
        const jsonPortfolio = portfolio.toJSON() as JsonPropositionPortfolioInterface;
        if (jsonPortfolio.amount) {
          jsonPortfolio.weight = jsonPortfolio.amount / totalAmount;
        }
        return jsonPortfolio;
      }),
      contracts: this.contracts,
      amount: totalAmount,
    };
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): Proposition {
    this.token = token;

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

  private getAmount(): number {
    let totalAmount = 0;
    this.portfolios.forEach((portfolio) => {
      const portfolioAmount = portfolio.amount;
      if (portfolioAmount) {
        totalAmount += portfolioAmount;
      }
    });
    return totalAmount;
  }

  public getAnswers(): Answer[] {
    return this.answers;
  }

  public getPortfolios(): Portfolio[] {
    return this.portfolios;
  }
}
