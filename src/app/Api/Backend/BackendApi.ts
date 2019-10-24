import { BackendClientInterface } from '../../../app/Clients/Backend/BackendClient';

import * as Answer from './Answer';
import * as Authentication from './Authentication';
import * as Customer from './Customer';
import * as Fund from './Fund';
import * as Onboarding from './Onboarding';
import * as Portfolio from './Portfolio';
import * as Proposition from './Proposition';
import * as Prospect from './Prospect';

export default class BackendApi {
  // Answer
  public createAnswers = Answer.createAnswers;
  public getAnswers = Answer.getAnswers;
  public prevalidateAnswers = Answer.prevalidateAnswers;
  // Authentication
  public login = Authentication.login;
  public logout = Authentication.logout;
  public forgotPassword = Authentication.forgotPassword;
  public sendValidationEmail = Authentication.sendValidationEmail;
  // Customer
  public createCustomer = Customer.createCustomer;
  public getCustomerDetails = Customer.getCustomerDetails;
  // Fund
  public findFunds = Fund.findFunds;
  // Onboarding
  public getBlocks = Onboarding.getBlocks;
  public getOnboarding = Onboarding.getOnboarding;
  public getQuestions = Onboarding.getQuestions;
  // Portfolio
  public findPortfolios = Portfolio.findPortfolios;
  // Proposition
  public generateProposition = Proposition.generateProposition;
  public generateProspectProposition = Proposition.generateProspectProposition;
  public getLastProposition = Proposition.getLastProposition;
  public getPropositionByToken = Proposition.getPropositionByToken;
  public validateProposition = Proposition.validateProposition;
  // Prospect
  public createProspect = Prospect.createProspect;

  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string, customerToken?: string) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey, customerToken);
  }
}
