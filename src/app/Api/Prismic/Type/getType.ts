import { Type as JsonTypeInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Type } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getType(slug: string): Promise<JsonTypeInterface> {
  const response = await getOne(ContentTypes.TYPE, slug);

  const type = new Type(response);

  return type.toJson();
}
