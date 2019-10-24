import { Apps, Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onPropositionGeneration(context: Context, token: string) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onPropositionGeneration(context, token);

    default:
      break;
  }
}

export default onPropositionGeneration;
