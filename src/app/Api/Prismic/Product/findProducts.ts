import { ContentTypes } from 'mieuxplacer-js-api';

import { ArrayToObject } from '../../../Helpers';
import { Product, Type, Supplier } from '../../../Models/Prismic';
import { find } from '..';
import { findTypes } from '../Type';
import { findSuppliers } from '../Supplier';

export default async function findProducts(filters: { [filter: string]: string | string[] }): Promise<Product[] | any> {
  const response = await find(ContentTypes.PRODUCT, filters);
  const products: Product[] = [];

  const typeUids: string[] = [];
  const supplierUids: string[] = [];

  response.forEach(item => {
    const typeId = item.data.type.uid;
    const supplierId = item.data.supplier.uid;

    if (!typeUids.includes(typeId)) {
      typeUids.push(typeId);
    }

    if (!supplierUids.includes(supplierId)) {
      supplierUids.push(supplierId);
    }
  });

  const [types, suppliers] = await Promise.all([findTypes({ uid: typeUids }), findSuppliers({ uid: supplierUids })]);

  const typesById: { [id: string]: Type } = ArrayToObject(types);
  const suppliersById: { [id: string]: Supplier } = ArrayToObject(suppliers);

  response.forEach(item => {
    const product = new Product(item);

    product.setType(typesById[item.data.type.id]);
    product.setSupplier(suppliersById[item.data.supplier.id]);

    products.push(product);
  });

  return products;
}
