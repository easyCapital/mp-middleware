import { Context } from '../../types';

import { Proposition } from '../Models/Proposition';
import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onPropositionGeneration(context: Context, proposition: Proposition): Promise<void> {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onPropositionGeneration(context, proposition);

    default:
      break;
  }
}

export default onPropositionGeneration;
