import { ContentTypes } from 'mieuxplacer-js-api';

import { Supplier } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getSupplier(slug: string): Promise<Supplier> {
  const response = await getOne(ContentTypes.SUPPLIER, slug);

  const supplier = new Supplier(response);

  return supplier;
}
