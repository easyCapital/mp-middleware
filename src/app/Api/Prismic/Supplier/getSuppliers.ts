import Prismic from 'prismic-javascript';
import { Supplier as JsonSupplierInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Supplier } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function getSuppliers(): Promise<JsonSupplierInterface[]> {
  try {
    const response = await PrismicClient.query({ query: Prismic.Predicates.at('document.type', 'supplier') });
    const suppliers: JsonSupplierInterface[] = [];

    response.results.forEach(item => {
      const supplier = new Supplier(item);

      suppliers.push(supplier.toJson());
    });

    return suppliers;
  } catch (error) {
    throw new Exception(error);
  }
}
