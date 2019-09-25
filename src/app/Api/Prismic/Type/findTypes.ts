import Prismic from 'prismic-javascript';
import { Type as JsonTypeInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Type } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function findTypes(filters: {
  [filter: string]: string | string[];
}): Promise<JsonTypeInterface[]> {
  try {
    const query: string[] = [];

    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (Array.isArray(value)) {
        query.push(Prismic.Predicates.in(`my.type.${filter}`, value));
      } else {
        query.push(Prismic.Predicates.at(`my.type.${filter}`, value));
      }
    });

    const response = await PrismicClient.query({ query });
    const types: JsonTypeInterface[] = [];

    response.results.forEach(item => {
      const type = new Type(item);

      types.push(type.toJson());
    });

    return types;
  } catch (error) {
    throw new Exception(error);
  }
}
