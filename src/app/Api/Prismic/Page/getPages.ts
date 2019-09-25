import Prismic from 'prismic-javascript';
import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Page } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getPages(): Promise<JsonPageInterface[]> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('document.type', 'page') });
    const pages: JsonPageInterface[] = [];

    response.results.forEach(item => {
      const page = new Page(item);

      pages.push(page.toJson());
    });

    return pages;
  } catch (error) {
    throw new Exception(error);
  }
}
