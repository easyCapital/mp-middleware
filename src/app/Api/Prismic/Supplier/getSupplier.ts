import Prismic from 'prismic-javascript';
import { Supplier as JsonSupplierInterface } from 'mieuxplacer-js-api';

import { Exception, NotFoundException } from '../../../Exceptions';
import { Supplier } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getSupplier(slug: string): Promise<JsonSupplierInterface> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('my.supplier.uid', slug) });

    if (response.results.length > 0) {
      const supplier = new Supplier(response.results[0]);

      return supplier.toJson();
    }
  } catch (error) {
    throw new Exception(error);
  }

  throw new NotFoundException("Ce fournisseur n'existe pas");
}
