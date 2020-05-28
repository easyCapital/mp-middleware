import { Filters, OrderBy } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { FileTypeMapper, FileStatusMapper } from '../../../../Mappers/File';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerFiles(
  this: BackendApi,
  customerId: number | string,
  filters?: Filters,
  orderBy?: OrderBy,
  latestBy?: string,
): Promise<File[]> {
  let formattedFilters: Filters = { user: customerId };

  if (filters) {
    if ('type' in filters) {
      if (Array.isArray(filters.type)) {
        formattedFilters.type__in = filters.type.map((type) => FileTypeMapper.reverseTransform(type));
      } else {
        formattedFilters.type = FileTypeMapper.reverseTransform(filters.type);
      }

      delete filters.type;
    }

    if ('status' in filters) {
      if (Array.isArray(filters.status)) {
        formattedFilters.status__in = filters.status.map((status) => FileStatusMapper.reverseTransform(status));
      } else {
        formattedFilters.status = FileStatusMapper.reverseTransform(filters.status);
      }

      delete filters.status;
    }

    formattedFilters = { ...formattedFilters, ...filters };
  }

  try {
    const response = await this.backendClient.get({
      url: 'file/cgp/search',
      filters: formattedFilters,
      orderBy,
      latestBy,
    });
    const data = await response.json();

    const files = data.map((item) => new File(item));

    return files;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
