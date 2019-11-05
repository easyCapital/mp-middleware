import { Answer } from '@robinfinance/js-api';

import { Apps, Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onOnboardingValidation(context: Context, answers: Answer, extra?: any) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingValidation(context, answers, extra);

    default:
      break;
  }
}

export default onOnboardingValidation;
