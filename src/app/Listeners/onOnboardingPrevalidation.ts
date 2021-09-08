import { Answer } from '@robinfinance/js-api';

import { Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onOnboardingPrevalidation(context: Context, answers: Answer[]): Promise<void> {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingPrevalidation(context, answers);

    default:
      break;
  }
}

export default onOnboardingPrevalidation;
