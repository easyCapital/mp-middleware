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
  public createAnswers = Answer.createAnswers;
  public prevalidateAnswers = Answer.prevalidateAnswers;
  public login = Authentication.login;
  public forgotPassword = Authentication.forgotPassword;
  public sendValidationEmail = Authentication.sendValidationEmail;
  public createCustomer = Customer.createCustomer;
  public getCustomerDetails = Customer.getCustomerDetails;
  public createProspect = Prospect.createProspect;
  public findFunds = Fund.findFunds;
  public getBlocks = Onboarding.getBlocks;
  public getOnboarding = Onboarding.getOnboarding;
  public getPropositionByToken = Proposition.getPropositionByToken;
  public getQuestions = Onboarding.getQuestions;
  public findPortfolios = Portfolio.findPortfolios;
  public generateProspectProposition = Proposition.generateProspectProposition;
  public validateProposition = Proposition.validateProposition;

  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey);
  }

  public setCustomerToken(customerToken?: string) {
    this.backendClient.setCustomerToken(customerToken);
  }
}
