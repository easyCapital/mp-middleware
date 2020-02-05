import { ContentType } from '@robinfinance/js-api';

import { Exception, NotFoundException } from '../../Exceptions';
import { find } from '.';

export default async function findOne(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
): Promise<any> {
  try {
    const results = await find(type, filters);

    if (results.length > 0) {
      return results[0];
    }
  } catch (error) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
