import { ContentType } from '@robinfinance/js-api';

import { Exception, NotFoundException } from '../../Exceptions';
import { find } from '.';

export default async function findOne(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
): Promise<any> {
  try {
    const results = await find(type, filters, linked, fields);

    if (results.length > 0) {
      return results[0];
    }
  } catch (error: any) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
