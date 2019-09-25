import Prismic from 'prismic-javascript';
import { Page as JsonPageInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Page } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function findPages(filters: {
  [filter: string]: string | string[];
}): Promise<JsonPageInterface[]> {
  try {
    const query: string[] = [];

    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (Array.isArray(value)) {
        query.push(Prismic.Predicates.in(`my.products.${filter}`, value));
      } else {
        query.push(Prismic.Predicates.at(`my.products.${filter}`, value));
      }
    });

    const response = await PrismicClient.query({ query });
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
