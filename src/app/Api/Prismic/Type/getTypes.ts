import Prismic from 'prismic-javascript';
import { Type as JsonTypeInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Type } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getTypes(): Promise<JsonTypeInterface[]> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('document.type', 'type') });
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
