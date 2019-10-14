import { Answer } from 'mieuxplacer-js-api';

import { Apps } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';
import BackendApi from '../Api/Backend';

async function onOnboardingDone(
  backendApi: BackendApi,
  app: string,
  answers: Answer,
  extra: { [key: string]: string },
) {
  switch (app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingDone(backendApi, answers, extra);

    default:
      break;
  }
}

export default onOnboardingDone;
