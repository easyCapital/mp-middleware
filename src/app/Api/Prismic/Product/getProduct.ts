import Prismic from 'prismic-javascript';
import { Product as JsonProductInterface } from 'mieuxplacer-js-api';

import { Exception, NotFoundException } from '../../../Exceptions';
import { Product } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getProduct(slug: string): Promise<JsonProductInterface> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('my.products.uid', slug) });

    // if (response.results.length > 0) {
    //   const product = new Product(response.results[0]);

    //   return product.toJson();
    // }
    return response.results[0];
  } catch (error) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce produit n'existe pas");
}
