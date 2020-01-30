import Prismic from 'prismic-javascript';
import { ContentType } from '@robinfinance/js-api';

import { Exception } from '../../Exceptions';
import { getMetaData } from './Helpers';

const PrismicClient = use('PrismicClient');

export default async function getAll(type: ContentType, orderBy?: string): Promise<any[]> {
  let orderings: string | undefined;

  if (orderBy) {
    orderings = `my.${type}.${orderBy}`;
  }

  try {
    const response = await PrismicClient.query({
      query: Prismic.Predicates.at('document.type', type),
      pagination: { perPage: 100 },
      orderings,
    });

    const meta = getMetaData(response);
    let results = response.results;
    let nextPage = meta.nextPage;

    while (nextPage) {
      const nextResponse = await PrismicClient.query({
        query: Prismic.Predicates.at('document.type', type),
        pagination: { perPage: 100, page: nextPage },
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
