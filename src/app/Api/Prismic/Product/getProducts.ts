import Prismic from 'prismic-javascript';
import { Product as JsonProductInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Product } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getProducts(): Promise<JsonProductInterface[]> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('document.type', 'products') });

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
