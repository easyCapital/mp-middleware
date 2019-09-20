import { Answer } from 'mieuxplacer-js-api';

import { App, Apps } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onOnboardingDone(app: App, answers: Answer, extra: { [key: string]: string }) {
  switch (app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingDone(answers, extra);

    default:
      break;
  }
}

export default onOnboardingDone;
