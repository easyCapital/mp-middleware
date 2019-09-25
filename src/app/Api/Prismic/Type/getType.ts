import Prismic from 'prismic-javascript';
import { Type as JsonTypeInterface } from 'mieuxplacer-js-api';

import { Exception, NotFoundException } from '../../../Exceptions';
import { Type } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getType(slug: string): Promise<JsonTypeInterface> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('my.type.uid', slug) });

    if (response.results.length > 0) {
      const type = new Type(response.results[0]);

      return type.toJson();
    }
  } catch (error) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce type de produit n'existe pas");
}
