import Prismic from 'prismic-javascript';

import { Exception, NotFoundException } from '../../Exceptions';

const PrismicClient = use('PrismicClient');

export default async function getOne(id: string): Promise<any> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('document.id', id) });

    if (response.results.length > 0) {
      return response.results[0];
    }
  } catch (error: any) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce contenu n'existe pas");
}
