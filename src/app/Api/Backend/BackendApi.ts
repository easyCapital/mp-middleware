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
  public createFile = File.createFile;
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
  public getRiskAdvice = Proposition.getRiskAdvice;
  public validateProposition = Proposition.validateProposition;
  // Prospect
  public createProspect = Prospect.createProspect;
  // Task
  public getContractTasks = Task.getContractTasks;
  // CGP - Agency
  public editAgency = CGP.editAgency;
  public getAgency = CGP.getAgency;
  // CGP - Answer
  public getCGPAnswersByCustomer = CGP.getAnswersByCustomer;
  public getCGPAnswers = CGP.getCGPAnswers;
  public getAgencyAnswers = CGP.getAgencyAnswers;
  public getCGPCustomerAnswers = CGP.getCustomerAnswers;
  public getCGPStudyAnswers = CGP.getStudyAnswers;
  public createCGPAnswers = CGP.createCGPAnswers;
  public createAgencyAnswers = CGP.createAgencyAnswers;
  public createCGPCustomerAnswers = CGP.createCustomerAnswers;
  public deactivateCGPAnswers = CGP.deactivateCGPAnswers;
  public deactivateAgencyAnswers = CGP.deactivateAgencyAnswers;
  public deactivateCGPCustomerAnswers = CGP.deactivateCustomerAnswers;
  // CGP - Authentication
  public loginCGP = CGP.login;
  public resetCGPPassword = CGP.resetPassword;
  public resetCGPPasswordConfirm = CGP.resetPasswordConfirm;
  // CGP - Contract
  public createCGPContractsFromProposition = CGP.createContractsFromProposition;
  public getCGPCustomerContracts = CGP.getCustomerContracts;
  public getGCPContractTasks = CGP.getContractTasks;
  // CGP - Customer
  public changeCGPCustomerEmail = CGP.changeCustomerEmail;
  public createCGPCustomer = CGP.createCustomer;
  public activateCGPCustomer = CGP.activateCustomer;
  public deactivateCGPCustomer = CGP.deactivateCustomer;
  public getCGPCustomer = CGP.getCustomer;
  public searchCGPCustomer = CGP.searchCustomers;
  // CGP - File
  public createCGPCustomerFile = CGP.createCustomerFile;
  public deleteCGPCustomerFile = CGP.deleteCustomerFile;
  public downloadCGPCustomerFile = CGP.downloadCustomerFile;
  public getCGPCustomerFiles = CGP.getCustomerFiles;
  public getCGPStudyFiles = CGP.getStudyFiles;
  public getCGPAllStudyFiles = CGP.getAllStudyFiles;
  public getInpactedCustomerFiles = CGP.getInpactedFiles;
  public generateCGPCustomerFiles = CGP.generateCustomerFiles;
  public downloadCGPContractFiles = CGP.downloadContractFiles;
  public downloadCGPStudyFiles = CGP.downloadStudyFiles;
  public getCGPFileSignatureUrl = CGP.getSignatureUrl;
  public linkCGPCustomerFile = CGP.linkCustomerFile;
  public mergeCGPCustomerFile = CGP.mergeCustomerFile;
  public sendCGPCustomerSignature = CGP.sendCustomerSignature;
  public cancelCGPCustomerFileSignature = CGP.cancelFileSignature;
  public setCGPCustomerFileAsSigning = CGP.setFileAsSigning;
  public downloadTemplateFile = CGP.downloadTemplateFile;
  // CGP - Observation
  public createObservation = CGP.createObservation;
  public deleteObservation = CGP.deleteObservation;
  public editObservation = CGP.editObservation;
  public reorderObservations = CGP.reorderObservations;
  public searchObservations = CGP.searchObservations;
  // CGP - Portfolio
  public createCGPPortfolio = CGP.createPortfolio;
  public getCGPRecommendedPortfolio = CGP.getRecommendedPortfolio;
  public prevalidateCGPPortfolios = CGP.prevalidatePortfolios;
  public searchCGPPortfolios = CGP.searchPortfolios;
  // CGP - Product
  public getProduct = CGP.getProduct;
  public getProducts = CGP.getProducts;
  // CGP - Proposition
  public generateCGPCustomerProposition = CGP.generateCustomerProposition;
  public getCGPCustomerPropositions = CGP.getCustomerPropositions;
  public getCGPProposition = CGP.getProposition;
  public getCGPStudyPropositions = CGP.getStudyPropositions;
  public createCGPCustomerProposition = CGP.createCustomerProposition;
  public createCGPStudyProposition = CGP.createStudyProposition;
  // CGP - PropositionV2
  public createCGPPropositionV2 = CGP.createPropositionV2;
  public getCGPPropositionV2 = CGP.getCGPPropositionV2;
  // CGP - Scoring
  public getCGPKnowledgeScoring = CGP.getKnowledgeScoring;
  public getCGPRiskScoring = CGP.getRiskScoring;
  public getCGPProfileScoring = CGP.getProfileScoring;
  // CGP - Study
  public createCGPStudy = CGP.createStudy;
  public editCGPCustomerStudy = CGP.editCustomerStudy;
  public getCGPCustomerStudies = CGP.getCustomerStudies;
  // CGP - Tag
  public createCGPCustomerTags = CGP.createCustomerTags;
  public deleteCGPCustomerTags = CGP.deleteCustomerTags;
  public getCGPCustomerTags = CGP.getCustomerTags;
  // CGP - Study Task
  public finishStudyTask = CGP.finishStudyTask;
  public getLatestCustomerTask = CGP.getLatestCustomerTask;
  // CGP - User
  public getCGPDetails = CGP.getCGPDetails;
  public getCGPStatistics = CGP.getCGPStatistics;
  public setCGHasSeenHelp = CGP.setHasSeenHelp;
  public modifyCGPPassword = CGP.modifyPassword;
  public modifyCGPSignature = CGP.modifySignature;

  protected getStepsAndBlocks = Onboarding.getStepsAndBlocks;

  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string, token?: BackendToken) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey, token);
  }
}
