import { Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onPropositionGeneration(context: Context, token: string) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onPropositionGeneration(context, token);

    default:
      break;
  }
}

export default onPropositionGeneration;
