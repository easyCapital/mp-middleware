import { ContentTypes } from '@robinfinance/js-api';

import { Type } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findType(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
): Promise<Type> {
  const response = await findOne(ContentTypes.TYPE, filters, linked, fields);

  const type = new Type(response);

  return type;
}
