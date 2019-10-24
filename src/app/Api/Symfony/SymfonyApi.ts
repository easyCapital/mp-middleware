import * as Proposition from './Proposition';
import { SymfonyClientInterface } from '../../Clients/Symfony/SymfonyClient';

export default class SymfonyApi {
  public sendPropositionByEmail = Proposition.sendPropositionByEmail;
  public downloadProposition = Proposition.downloadProposition;

  protected symfonyClient: SymfonyClientInterface;

  constructor(customerToken?: string) {
    this.symfonyClient = use('SymfonyClientBuilder')(customerToken);
  }
}
