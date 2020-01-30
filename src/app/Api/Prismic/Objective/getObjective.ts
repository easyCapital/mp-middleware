import { Objective } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getObjective(id: string): Promise<Objective> {
  const response = await getOne(id);

  const objective = new Objective(response);

  return objective;
}
