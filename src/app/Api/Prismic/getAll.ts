import { ContentType } from '@robinfinance/js-api';

import { Exception } from '../../Exceptions';
import { getMetaData, createQuery } from './Helpers';

const PrismicClient = use('PrismicClient');

export default async function getAll(
  type: ContentType,
  filters?: {
    [filter: string]: string | string[];
  },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<any[]> {
  const query = createQuery(type, filters, linked);

  let formattedFields: string | undefined;
  let orderings: string | undefined;

  if (fields) {
    formattedFields = Array.isArray(fields) ? fields.map((item) => `${type}.${item}`).join(',') : `${type}.${fields}`;
  }

  if (orderBy) {
    orderings = `my.${type}.${orderBy}`;
  }

  try {
    const response = await PrismicClient.query({
      query,
      pagination: { perPage: 100 },
      fields: formattedFields,
      orderings,
    });

    const meta = getMetaData(response);
    let results = response.results;
    let nextPage = meta.nextPage;

    while (nextPage) {
      const nextResponse = await PrismicClient.query({
        query,
        pagination: { perPage: 100, page: nextPage },
        fields: formattedFields,
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
