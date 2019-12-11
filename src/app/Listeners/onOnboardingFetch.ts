import { Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onOnboardingFetch(context: Context): Promise<any> {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onOnboardingFetch(context);

    default:
      break;
  }
}

export default onOnboardingFetch;
