import { Type as JsonTypeInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Type } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getTypes(): Promise<JsonTypeInterface[]> {
  const response = await getAll(ContentTypes.TYPE);
  const types: JsonTypeInterface[] = [];

  response.forEach(item => {
    const type = new Type(item);

    types.push(type.toJson());
  });

  return types;
}
