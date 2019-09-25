import Prismic from 'prismic-javascript';
import { ContentType } from 'mieuxplacer-js-api';

import { Exception } from '../../Exceptions';

const PrismicClient = use('PrismicClient');

export default async function find(
  type: ContentType,
  filters: {
    [filter: string]: string | string[];
  },
): Promise<any[]> {
  try {
    const query: string[] = [];

    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (Array.isArray(value)) {
        query.push(Prismic.Predicates.in(`my.${type}.${filter}`, value));
      } else {
        query.push(Prismic.Predicates.at(`my.${type}.${filter}`, value));
      }
    });

    const response = await PrismicClient.query({ query });

    return response.results;
  } catch (error) {
    throw new Exception(error);
  }
}
