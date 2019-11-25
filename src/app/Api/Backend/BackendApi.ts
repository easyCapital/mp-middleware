import { BackendClientInterface, BackendToken } from '../../../app/Clients/Backend/BackendClient';

import * as Answer from './Answer';
import * as Authentication from './Authentication';
import * as Customer from './Customer';
import * as Fund from './Fund';
import * as Onboarding from './Onboarding';
import * as Portfolio from './Portfolio';
import * as Proposition from './Proposition';
import * as Prospect from './Prospect';
import * as CGP from './CGP';

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
  // CGP - Answer
  public createCGPAnswers = CGP.createAnswers;
  // CGP - Contract
  public createCGPContractsFromProposition = CGP.createContractsFromProposition;
  public findCGPContracts = CGP.findContracts;
  // CGP - ContractTask
  public findCGPContractTasks = CGP.findContractTasks;
  // CGP - Customer
  public getCGPCustomer = CGP.getCustomer;
  public searchCGPCustomer = CGP.searchCustomers;
  // CGP - Portfolio
  public createCGPPortfolio = CGP.createPortfolio;
  public prevalidateCGPPortfolio = CGP.prevalidatePortfolio;
  // CGP - Product
  public getProduct = CGP.getProduct;
  // CGP - Proposition
  public getCGPCustomerPropositions = CGP.getCustomerPropositions;
  public getCGPCustomerProposition = CGP.getCustomerProposition;
  public createCGPCustomerProposition = CGP.createCustomerProposition;

  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string, token?: BackendToken) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey, token);
  }
}
