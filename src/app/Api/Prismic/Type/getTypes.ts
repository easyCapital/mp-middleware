import { ContentTypes } from '@robinfinance/js-api';

import { Type } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getTypes(
  filters?: { [filter: string]: string | string[] },
  orderBy?: string,
): Promise<Type[]> {
  const response = await getAll(ContentTypes.TYPE, filters, orderBy);
  const types: Type[] = [];

  response.forEach(item => {
    const type = new Type(item);

    types.push(type);
  });

  return types;
}
