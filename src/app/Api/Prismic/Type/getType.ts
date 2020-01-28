import { Type } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getType(id: string): Promise<Type> {
  const response = await getOne(id);

  const type = new Type(response);

  return type;
}
