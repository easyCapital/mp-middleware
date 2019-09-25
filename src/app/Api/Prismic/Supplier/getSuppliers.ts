import { Supplier as JsonSupplierInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Supplier } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getSuppliers(): Promise<JsonSupplierInterface[]> {
  const response = await getAll(ContentTypes.SUPPLIER);
  const suppliers: JsonSupplierInterface[] = [];

  response.forEach(item => {
    const supplier = new Supplier(item);

    suppliers.push(supplier.toJson());
  });

  return suppliers;
}
