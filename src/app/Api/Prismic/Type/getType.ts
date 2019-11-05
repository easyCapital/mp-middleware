import { ContentTypes } from '@robinfinance/js-api';

import { Type } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getType(slug: string): Promise<Type> {
  const response = await getOne(ContentTypes.TYPE, slug);
  const type = new Type(response);

  return type;
}
