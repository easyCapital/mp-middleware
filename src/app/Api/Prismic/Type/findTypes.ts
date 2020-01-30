import { ContentTypes } from '@robinfinance/js-api';

import { Type } from '../../../Models/Prismic';
import { find } from '..';

export default async function findTypes(
  filters: { [filter: string]: string | string[] },
  orderBy?: string,
): Promise<Type[]> {
  const response = await find(ContentTypes.TYPE, filters, orderBy);
  const types: Type[] = [];

  response.forEach(item => {
    const type = new Type(item);

    types.push(type);
  });

  return types;
}
