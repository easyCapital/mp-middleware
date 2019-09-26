import { ContentTypes } from 'mieuxplacer-js-api';

import { Type } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getTypes(): Promise<Type[]> {
  const response = await getAll(ContentTypes.TYPE);
  const types: Type[] = [];

  response.forEach(item => {
    const type = new Type(item);

    types.push(type);
  });

  return types;
}
