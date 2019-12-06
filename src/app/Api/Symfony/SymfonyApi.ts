import * as Proposition from './Proposition';
import { SymfonyClientInterface } from '../../Clients/Symfony/SymfonyClient';

export default class SymfonyApi {
  public sendPropositionByEmail = Proposition.sendPropositionByEmail;

  protected symfonyClient: SymfonyClientInterface;

  constructor(customerToken?: string) {
    this.symfonyClient = use('SymfonyClientBuilder')(customerToken);
  }
}
