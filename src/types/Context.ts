import { Http } from '../../typings/@adonisjs';
import BackendApi from '../app/Api/Backend';
import { App } from './Apps';
import SymfonyApi from '../app/Api/Symfony';

export interface Context extends Http.Context {
  backendApi: BackendApi;
  app: App;
  authenticated: boolean;
  backendApiKey: string;
  symfonySession?: any;
  universe?: string;
  symfonyApi: SymfonyApi;
  updateCustomerToken: (customerToken?: string) => void;
}
