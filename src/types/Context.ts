import { Http } from '../../typings/@adonisjs';
import BackendApi from '../app/Api/Backend';
import { App } from './Apps';

export interface Context extends Http.Context {
  backendApi: BackendApi;
  app: App;
  authenticated: boolean;
  symfonySession?: any;
  universe?: string;
}
