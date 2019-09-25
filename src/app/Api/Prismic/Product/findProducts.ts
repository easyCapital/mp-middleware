import Prismic from 'prismic-javascript';
import { Product as JsonProductInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Product } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function findProducts(filters: {
  [filter: string]: string | string[];
}): Promise<JsonProductInterface[]> {
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
    const products: JsonProductInterface[] = [];

    response.results.forEach(item => {
      const product = new Product(item);

      products.push(product.toJson());
    });

    return products;
  } catch (error) {
    throw new Exception(error);
  }
}
