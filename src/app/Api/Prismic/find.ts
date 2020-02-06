import { ContentType } from '@robinfinance/js-api';

import { Exception } from '../../Exceptions';
import { createQuery } from './Helpers';

const PrismicClient = use('PrismicClient');

export default async function find(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<any[]> {
  const query: string[] = createQuery(type, filters, linked);

  let formattedFields: string | undefined;
  let orderings: string | undefined;

  if (fields) {
    formattedFields = Array.isArray(fields) ? fields.map(item => `${type}.${item}`).join(',') : `${type}.${fields}`;
  }

  if (orderBy) {
    orderings = `my.${type}.${orderBy}`;
  }

  try {
    const response = await PrismicClient.query({ query, fields: formattedFields, orderings });

    return response.results;
  } catch (error) {
    throw new Exception(error);
  }
}
