import { Type as JsonTypeInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Type } from '../../../Models/Prismic';
import { find } from '..';

export default async function findTypes(filters: {
  [filter: string]: string | string[];
}): Promise<JsonTypeInterface[]> {
  const response = await find(ContentTypes.TYPE, filters);
  const types: JsonTypeInterface[] = [];

  response.forEach(item => {
    const type = new Type(item);

    types.push(type.toJson());
  });

  return types;
}
