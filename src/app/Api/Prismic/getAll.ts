import { ContentType } from '@robinfinance/js-api';

import { Exception } from '../../Exceptions';
import { getMetaData, createQuery } from './Helpers';

const PrismicClient = use('PrismicClient');

export default async function getAll(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
  orderBy?: string,
): Promise<any[]> {
  const query = createQuery(type, filters);
  let orderings: string | undefined;

  if (orderBy) {
    orderings = `my.${type}.${orderBy}`;
  }

  try {
    const response = await PrismicClient.query({
      query,
      pagination: { perPage: 100 },
      orderings,
    });

    const meta = getMetaData(response);
    let results = response.results;
    let nextPage = meta.nextPage;

    while (nextPage) {
      const nextResponse = await PrismicClient.query({
        query,
        pagination: { perPage: 100, page: nextPage },
        orderings,
      });

      const nextMeta = getMetaData(nextResponse);

      nextPage = nextMeta.nextPage;
      results = results.concat(nextResponse.results);
    }

    return results;
  } catch (error) {
    throw new Exception(error);
  }
}
