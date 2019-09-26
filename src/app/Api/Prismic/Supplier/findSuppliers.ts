import { ContentTypes } from 'mieuxplacer-js-api';

import { Supplier } from '../../../Models/Prismic';
import { find } from '..';

export default async function findSuppliers(filters: { [filter: string]: string | string[] }): Promise<Supplier[]> {
  const response = await find(ContentTypes.SUPPLIER, filters);
  const suppliers: Supplier[] = [];

  response.forEach(item => {
    const supplier = new Supplier(item);

    suppliers.push(supplier);
  });

  return suppliers;
}
