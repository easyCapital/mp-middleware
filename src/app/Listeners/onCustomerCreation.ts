import { Apps, Context } from '../../types';

import * as MieuxplacerEvents from './Mieuxplacer';

async function onCustomerCreation(context: Context, extra?: any) {
  switch (context.app) {
    case Apps.MIEUXPLACER:
      return MieuxplacerEvents.onCustomerCreation(context, extra);

    default:
      break;
  }
}

export default onCustomerCreation;
