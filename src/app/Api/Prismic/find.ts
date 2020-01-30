import Prismic from 'prismic-javascript';
import { ContentType } from '@robinfinance/js-api';

import { Exception } from '../../Exceptions';

const PrismicClient = use('PrismicClient');

export default async function find(
  type: ContentType,
  filters: {
    [filter: string]: string | string[];
  },
  orderBy?: string,
): Promise<any[]> {
  try {
    const query: string[] = [];
    let orderings: string | undefined;

    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (Array.isArray(value)) {
        query.push(Prismic.Predicates.any(`my.${type}.${filter}`, value));
      } else {
        query.push(Prismic.Predicates.at(`my.${type}.${filter}`, value));
      }
    });

    if (orderBy) {
      orderings = `my.${type}.${orderBy}`;
    }

    const response = await PrismicClient.query({ query, orderings });

    return response.results;
  } catch (error) {
    throw new Exception(error);
  }
}
