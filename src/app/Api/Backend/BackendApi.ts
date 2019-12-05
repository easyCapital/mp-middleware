import { BackendClientInterface, BackendToken } from '../../../app/Clients/Backend/BackendClient';

import * as Answer from './Answer';
import * as Authentication from './Authentication';
import * as Contract from './Contract';
import * as Customer from './Customer';
import * as File from './File';
import * as Fund from './Fund';
import * as Onboarding from './Onboarding';
import * as Portfolio from './Portfolio';
import * as Proposition from './Proposition';
import * as Prospect from './Prospect';
import * as Task from './Task';
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
  // Contract
  public getContract = Contract.getContract;
  public getContracts = Contract.getContracts;
  // Customer
  public createCustomer = Customer.createCustomer;
  public getCustomerDetails = Customer.getCustomerDetails;
  // File
  public getFiles = File.getFiles;
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
  // Task
  public getContractTasks = Task.getContractTasks;
  // CGP - Answer
  public getCGPCustomerAnswers = CGP.getCustomerAnswers;
  public createCGPAnswers = CGP.createCustomerAnswers;
  // CGP - Contract
  public createCGPContractsFromProposition = CGP.createContractsFromProposition;
  public getCGPCustomerContracts = CGP.getCustomerContracts;
  // CGP - Customer
  public createCGPCustomer = CGP.createCustomer;
  public getCGPCustomer = CGP.getCustomer;
  public searchCGPCustomer = CGP.searchCustomers;
  // CGP - File
  public getCGPCustomerFiles = CGP.getCustomerFiles;
  public downloadCGPCustomerFile = CGP.downloadCustomerFile;
  // CGP - Portfolio
  public createCGPPortfolio = CGP.createPortfolio;
  public prevalidateCGPPortfolio = CGP.prevalidatePortfolio;
  // CGP - Product
  public getProduct = CGP.getProduct;
  // CGP - Proposition
  public generateCGPCustomerProposition = CGP.generateCustomerProposition;
  public getCGPCustomerPropositions = CGP.getCustomerPropositions;
  public getCGPProposition = CGP.getProposition;
  public createCGPCustomerProposition = CGP.createCustomerProposition;
  public downloadCGPMissionReport = CGP.downloadMissionReport;
  // CGP - Task
  public getGCPContractTasks = CGP.getContractTasks;
  // CGP - User
  public getCGPDetails = CGP.getCGPDetails;

  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string, token?: BackendToken) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey, token);
  }
}
