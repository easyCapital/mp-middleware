import { BackendClientInterface } from '../../../app/Clients/Backend/BackendClient';
import * as Proposition from './Proposition';
import * as Authentication from './Authentication';
import * as Fund from './Fund';
import * as Onboarding from './Onboarding';
import * as Portfolio from './Portfolio';
import * as Prospect from './Prospect';

export default class BackendApi {
  public getPropositionByToken = Proposition.getPropositionByToken;
  public generateProspectProposition = Proposition.generateProspectProposition;
  public forgotPassword = Authentication.forgotPassword;
  public findFunds = Fund.findFunds;
  public getOnboarding = Onboarding.getOnboarding;
  public getQuestions = Onboarding.getQuestions;
  public prevalidateAnswers = Onboarding.prevalidateAnswers;
  public findPortfolios = Portfolio.findPortfolios;
  public creatProspect = Prospect.creatProspect;
  protected backendClient: BackendClientInterface;

  constructor(backendApiKey: string) {
    this.backendClient = use('BackendClientBuilder')(backendApiKey);
  }
}
