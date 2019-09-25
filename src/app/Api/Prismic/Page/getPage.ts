import Prismic from 'prismic-javascript';
import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { Exception, NotFoundException } from '../../../Exceptions';
import { Page } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getPage(slug: string): Promise<JsonPageInterface> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('my.page.uid', slug) });

    if (response.results.length > 0) {
      const page = new Page(response.results[0]);

      return page.toJson();
    }
  } catch (error) {
    throw new Exception(error);
  }

  throw new NotFoundException("Cette page n'existe pas");
}
