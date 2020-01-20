import { QuestionAnswer } from '@robinfinance/js-api';

import { Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onOnboardingPrevalidation(context: Context, answers: QuestionAnswer, extra?: any) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingPrevalidation(context, answers);

    default:
      break;
  }
}

export default onOnboardingPrevalidation;
