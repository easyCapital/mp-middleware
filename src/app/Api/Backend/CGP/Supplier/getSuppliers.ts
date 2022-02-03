import { Filters } from '@robinfinance/js-api';

import { Supplier } from '../../../../Models/Product';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function getSuppliers(this: BackendApi, filters?: Filters): Promise<Supplier[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/suppliers',
      filters,
    });

    const data = await response.json();

    const suppliers = data.map((item) => new Supplier(item));

    const meta = formatMeta(response.headers);

    if (meta.totalPages && meta.totalPages > 1) {
      const supplierQueries: Promise<any>[] = [];

      for (let page = 2; page <= meta.totalPages; page += 1) {
        supplierQueries.push(
          this.backendClient.get({
            url: 'cgp/suppliers',
            filters,
            pagination: {
              page,
              perPage: 100,
            },
          }),
        );
      }

      const supplierResponses = await Promise.all(supplierQueries);

      for await (const supplierResponse of supplierResponses) {
        const supplierData = await supplierResponse.json();

        supplierData.forEach((item: any) => suppliers.push(new Supplier(item)));
      }
    }

    return suppliers;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
