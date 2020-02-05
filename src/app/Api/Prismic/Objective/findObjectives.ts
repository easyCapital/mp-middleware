import { ContentTypes } from '@robinfinance/js-api';

import { Objective } from '../../../Models/Prismic';
import { find } from '..';

export default async function findObjectives(
  filters?: { [filter: string]: string | string[] },
  orderBy?: string,
): Promise<Objective[]> {
  const response = await find(ContentTypes.OBJECTIVE, filters, orderBy);
  const objectives: Objective[] = [];

  response.forEach(item => {
    const objective = new Objective(item);

    objectives.push(objective);
  });

  return objectives;
}
