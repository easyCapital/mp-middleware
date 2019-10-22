import { Answer } from 'mieuxplacer-js-api';

import { Apps, Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onOnboardingPrevalidation(context: Context, answers: Answer, extra?: any) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingPrevalidation(context, answers);

    default:
      break;
  }
}

export default onOnboardingPrevalidation;
