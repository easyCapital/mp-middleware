import { Answer } from '@robinfinance/js-api';

import { Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';
import * as ConseilEvents from './Conseil';

const Apps = use('Config').get('mpApps');

async function onOnboardingValidation(context: Context, answers: Answer, extra?: any) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingValidation(context, answers, extra);

    case Apps.CONSEIL:
      return ConseilEvents.onOnboardingValidation(context, extra);

    default:
      break;
  }
}

export default onOnboardingValidation;
