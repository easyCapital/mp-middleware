import { Http } from '../../typings/@adonisjs';

import BackendApi from '../app/Api/Backend';
import SymfonyApi from '../app/Api/Symfony';
import { UserType } from '../app/Clients/Backend/types';
import { BackendToken } from '../../src/app/Clients/Backend/BackendClient';

export interface Context extends Http.Context {
  backendApi: BackendApi;
  app: { name: string; userType: UserType; signatureCallback?: string; contractSignatureCallback?: string };
  origin: string;
  authenticated: boolean;
  backendApiKey: string;
  symfonySession?: any;
  universe?: string;
  symfonyApi: SymfonyApi;
  updateToken: (token: BackendToken) => void;
}
