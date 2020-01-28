import { Supplier } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getSupplier(id: string): Promise<Supplier> {
  const response = await getOne(id);

  const supplier = new Supplier(response);

  return supplier;
}
