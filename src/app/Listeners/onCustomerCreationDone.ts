import { Apps } from '../../types';
import BackendApi from '../Api/Backend';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onCustomerCreationDone(backendApi: BackendApi, app: string, data: { [key: string]: string }) {
  switch (app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onCustomerCreationDone(backendApi, { ...data, app });

    default:
      break;
  }
}

export default onCustomerCreationDone;
