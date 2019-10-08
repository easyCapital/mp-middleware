import Prismic from 'prismic-javascript';
import { ContentType } from 'mieuxplacer-js-api';

import { Exception, NotFoundException } from '../../Exceptions';

const PrismicClient = use('PrismicClient');

export default async function getOne(type: ContentType, slug: string): Promise<any> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at(`my.${type}.uid`, slug) });

    if (response.results.length > 0) {
      return response.results[0];
    }
  } catch (error) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
