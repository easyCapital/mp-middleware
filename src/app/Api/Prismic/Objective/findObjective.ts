import { ContentTypes } from '@robinfinance/js-api';

import { Objective } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findObjective(filters?: { [filter: string]: string | string[] }): Promise<Objective> {
  const response = await findOne(ContentTypes.OBJECTIVE, filters);

  const objective = new Objective(response);

  return objective;
}
