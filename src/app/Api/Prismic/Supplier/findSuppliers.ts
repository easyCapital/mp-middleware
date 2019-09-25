import Prismic from 'prismic-javascript';
import { Supplier as JsonSupplierInterface } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { Supplier } from '../../../Models/Prismic';

const PrismicClient = use('PrismicClient');

export default async function findSuppliers(filters: {
  [filter: string]: string | string[];
}): Promise<JsonSupplierInterface[]> {
  try {
    const query: string[] = [];

    Object.keys(filters).forEach(filter => {
      const value = filters[filter];

      if (Array.isArray(value)) {
        query.push(Prismic.Predicates.in(`my.supplier.${filter}`, value));
      } else {
        query.push(Prismic.Predicates.at(`my.supplier.${filter}`, value));
      }
    });

    const response = await PrismicClient.query({ query });
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
