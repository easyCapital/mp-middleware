import { Apps, Context } from '../../types';

import { Question } from '../Models/Onboarding';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onOnboardingFetch(context: Context, questions: { [key: string]: Question }, extra?: any): Promise<any> {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingFetch(context, questions);

    default:
      break;
  }
}

export default onOnboardingFetch;
