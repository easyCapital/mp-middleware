import { Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

const Apps = use('Config').get('mpApps');

async function onCustomerCreation(context: Context, extra?: any) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onCustomerCreation(context, extra);

    default:
      break;
  }
}

export default onCustomerCreation;
