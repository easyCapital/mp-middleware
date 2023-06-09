import { BackendClientInterface, BackendToken } from '../../../app/Clients/Backend/BackendClient';

import * as Answer from './Answer';
import * as Contract from './Contract';
import * as ClientFormData from './ClientFormData';
import * as Customer from './Customer';
import * as File from './File';
import * as Fund from './Fund';
import * as Onboarding from './Onboarding';
import * as Portfolio from './Portfolio';
import * as Proposition from './Proposition';
import * as Prospect from './Prospect';
import * as Task from './Task';
import * as Question from './Question';
import * as CGP from './CGP';

export default class BackendApi {
  // Answer
  public createAnswers = Answer.createAnswers;
  public getAnswers = Answer.getAnswers;
  public prevalidateAnswers = Answer.prevalidateAnswers;
  // ClientFormData
  public getClientFormData = ClientFormData.getClientFormData;
  public setClientFormData = ClientFormData.setClientFormData;
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
  // Question
  public getPublicQuestions = Question.getQuestions;
  public getPublicQuestionnaire = Question.getQuestionnaire;
  // Task
  public getContractTasks = Task.getContractTasks;
  // CGP - Agency
  public editAgency = CGP.editAgency;
  public getAgency = CGP.getAgency;
  // CGP - Analysis
  public searchCGPAnalysis = CGP.searchAnalyses;
  public generateCGPCustomerAnalysis = CGP.generateCustomerAnalysis;
  public setCGPCustomerValidAnalysis = CGP.setCustomerValidAnalysis;
  // CGP - Answer
  public getCGPAnswers = CGP.getAnswers;
  public getAgencyAnswers = CGP.getAgencyAnswers;
  public createCGPAnswers = CGP.createCGPAnswers;
  public createAgencyAnswers = CGP.createAgencyAnswers;
  public createCGPCustomerAnswers = CGP.createCustomerAnswers;
  public createHouseholdAnswers = CGP.createHouseholdAnswers;
  public deactivateCGPAnswers = CGP.deactivateCGPAnswers;
  public deactivateAgencyAnswers = CGP.deactivateAgencyAnswers;
  public deactivateCGPCustomerAnswers = CGP.deactivateCustomerAnswers;
  public deactivateHouseholdAnswers = CGP.deactivateHouseholdAnswers;
  public migrateHouseholdAnswers = CGP.migrateHouseholdAnswers;
  // CGP - Authentication
  public loginCGP = CGP.login;
  public resetCGPPassword = CGP.resetPassword;
  public resetCGPPasswordConfirm = CGP.resetPasswordConfirm;
  // CGP - Category
  public getCGPProductCategoriesFactSheet = CGP.getProductCategoriesFactSheet;
  public updateCGPProductCategoryFactSheet = CGP.updateProductCategoryFactSheet;
  // CGP - ClientForm
  public createCGPClientForm = CGP.createClientForm;
  public deactivateCGPClientForm = CGP.deactivateClientForm;
  public getCGPActiveClientForm = CGP.getActiveClientForm;
  // CGP - Contract
  public createCGPContractsFromProposition = CGP.createContractsFromProposition;
  public createCGPContractsFromPropositionV2 = CGP.createContractsFromPropositionV2;
  public getCGPCustomerContracts = CGP.getCustomerContracts;
  // CGP - Customer
  public changeCGPCustomerEmail = CGP.changeCustomerEmail;
  public createCGPCustomer = CGP.createCustomer;
  public createCGPCustomers = CGP.createCustomers;
  public activateCGPCustomer = CGP.activateCustomer;
  public deactivateCGPCustomer = CGP.deactivateCustomer;
  public getCGPCustomer = CGP.getCustomer;
  public exportCustomers = CGP.exportCustomers;
  public searchCGPCustomer = CGP.searchCustomers;
  public prevalidateCustomers = CGP.prevalidateCustomers;
  // CGP - Household
  public createHousehold = CGP.createHousehold;
  public createHouseholdMember = CGP.createHouseholdMember;
  public createHouseholds = CGP.createHouseholds;
  public prevalidateHouseholds = CGP.prevalidateHouseholds;
  public editHousehold = CGP.editHousehold;
  public getHousehold = CGP.getHousehold;
  public searchHouseholds = CGP.searchHouseholds;
  public deleteHousehold = CGP.deleteHousehold;
  public exportHousehold = CGP.exportHouseHold;
  // CGP - File
  public createCGPCustomerFile = CGP.createCustomerFile;
  public deleteCGPCustomerFile = CGP.deleteCustomerFile;
  public downloadCGPCustomerFile = CGP.downloadCustomerFile;
  public getCustomerFiles = CGP.getCustomerFiles;
  public getCGPStudyFiles = CGP.getStudyFiles;
  public getCGPAllStudyFiles = CGP.getAllStudyFiles;
  public getFileQuestions = CGP.getFileQuestions;
  public getInpactedFiles = CGP.getInpactedFiles;
  public getFileSignature = CGP.getSignature;
  public getCGPSignatureDetails = CGP.getSignatureDetails;
  public generateCGPCustomerFiles = CGP.generateCustomerFiles;
  public downloadCGPContractFiles = CGP.downloadContractFiles;
  public downloadCGPStudyFiles = CGP.downloadStudyFiles;
  public signCustomerFiles = CGP.signCustomerFiles;
  public linkCGPCustomerFile = CGP.linkCustomerFile;
  public mergeCGPCustomerFile = CGP.mergeCustomerFile;
  public sendCGPCustomerSignature = CGP.sendCustomerSignature;
  public cancelCGPCustomerFileSignature = CGP.cancelFileSignature;
  public setCGPCustomerFileAsSigning = CGP.setFileAsSigning;
  public setCGPCustomerFilesAsArchived = CGP.setFilesAsArchived;
  public updateCGPStudyFiles = CGP.updateStudyFiles;
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
  // CGP - Product Category
  public getProductCategories = CGP.getProductCategories;
  // CGP - Supplier
  public getSupplier = CGP.getSupplier;
  public getSuppliers = CGP.getSuppliers;
  // CGP - Partners
  public createCGPPartner = CGP.createPartner;
  public getCGPPartners = CGP.getPartners;
  public updateCGPPartner = CGP.updatePartner;
  public deleteCGPPartner = CGP.deletePartner;
  public getCGPProductPartnerInformation = CGP.getProductPartnerInformation;
  public updateCGPProductPartnerInformation = CGP.updateProductPartnerInformation;
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
  // CGP - Question
  public getCGPForm = CGP.getForm;
  public getCGPQuestionsLastUpdated = CGP.getQuestionsLastUpdated;
  // CGP - Scoring
  public getCGPKnowledgeScoring = CGP.getKnowledgeScoring;
  public getCGPRiskScoring = CGP.getRiskScoring;
  public getCGPAfiEscaProfileScoring = CGP.getAfiEscaProfileScoring;
  public getCGPSerenalisProfileScoring = CGP.getSerenalisProfileScoring;
  // CGP - Study
  public createStudy = CGP.createStudy;
  public getStudy = CGP.getStudy;
  public editStudy = CGP.editStudy;
  public updateStudy = CGP.updateStudy;
  public getHouseholdStudies = CGP.getHouseholdStudies;
  public deleteStudy = CGP.deleteStudy;
  // CGP - Tag
  public createTags = CGP.createTags;
  public deleteTags = CGP.deleteTags;
  // CGP - Study Task
  public finishStudyTask = CGP.finishStudyTask;
  // CGP - User
  public getCGPDetails = CGP.getCGPDetails;
  public getCGPStatistics = CGP.getCGPStatistics;
  public getCGPTags = CGP.getCGPTags;
  public getCGPStripePortalUrl = CGP.getStripePortalUrl;
  public setCGHasSeenHelp = CGP.setHasSeenHelp;
  public modifyCGPPassword = CGP.modifyPassword;
  public modifyCGPSignature = CGP.modifySignature;

  protected getStepsAndBlocks = Onboarding.getStepsAndBlocks;

  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string, token?: BackendToken) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey, token);
  }
}
