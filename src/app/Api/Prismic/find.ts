import { ContentType } from '@robinfinance/js-api';

import { Exception } from '../../Exceptions';
import { createQuery } from './Helpers';

const PrismicClient = use('PrismicClient');

export default async function find(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
  orderBy?: string,
): Promise<any[]> {
  try {
    const query: string[] = createQuery(type, filters);
    let orderings: string | undefined;

    if (orderBy) {
      orderings = `my.${type}.${orderBy}`;
    }

    const response = await PrismicClient.query({ query, orderings });

    return response.results;
  } catch (error) {
    throw new Exception(error);
  }
}
