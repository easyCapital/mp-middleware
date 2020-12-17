import BackendClient from 'App/Clients/BackendClient';

import { BackendClientContract } from 'Contracts/Clients/BackendClient';
import { BackendServiceContract } from 'Contracts/Service/BackendService';

import * as CGP from './APIs/CGP';

export default class BackendService implements BackendServiceContract {
  protected client: BackendClientContract;

  constructor(apiKey: string, token?: string) {
    this.client = new BackendClient(apiKey, token);
  }

  public setToken(token: string) {
    this.client.setToken(token);
  }

  /**
   * CGP
   */

  // AGENCY
  public editCGPAgency = CGP.editAgency;
  public getCGPAgency = CGP.getAgency;

  // AUTHENTICATION
  public loginCGP = CGP.login;
  public resetCGPPassword = CGP.resetPassword;
  public resetCGPPasswordConfirm = CGP.resetPasswordConfirm;
  // USER
  public changeCGPPassword = CGP.changePassword;
  public changeCGPSignature = CGP.changeSignature;
  public getCGPDetails = CGP.getDetails;
}
