import { Filters } from '@robinfinance/js-api';

import { Supplier } from '../../../../Models/Product';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSuppliers(this: BackendApi, filters?: Filters): Promise<Supplier[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/suppliers',
      filters,
    });

    const data = await response.json();

    const suppliers = data.map((item) => new Supplier(item));

    return suppliers;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
