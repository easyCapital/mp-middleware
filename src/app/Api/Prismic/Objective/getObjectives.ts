import { ContentTypes } from '@robinfinance/js-api';

import { Objective } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getObjectives(orderBy?: string): Promise<Objective[]> {
  const response = await getAll(ContentTypes.OBJECTIVE, orderBy);
  const objectives: Objective[] = [];

  response.forEach(item => {
    const objective = new Objective(item);

    objectives.push(objective);
  });

  return objectives;
}
