import { Context } from '../../types';

import { Question } from '../Models/Onboarding';

import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onOnboardingFetch(context: Context, questions: { [key: string]: Question }): Promise<any> {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingFetch(context, questions);

    default:
      break;
  }
}

export default onOnboardingFetch;
