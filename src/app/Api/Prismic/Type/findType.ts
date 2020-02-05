import { ContentTypes } from '@robinfinance/js-api';

import { Type } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findType(filters?: { [filter: string]: string | string[] }): Promise<Type> {
  const response = await findOne(ContentTypes.TYPE, filters);

  const type = new Type(response);

  return type;
}
