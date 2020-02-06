import { ContentTypes } from '@robinfinance/js-api';

import { Objective } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findObjective(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
): Promise<Objective> {
  const response = await findOne(ContentTypes.OBJECTIVE, filters, linked, fields);

  const objective = new Objective(response);

  return objective;
}
