import { Filters } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { FileTypeMapper } from '../../../../Mappers/File';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerFiles(this: BackendApi, filters?: Filters): Promise<File[]> {
  if (filters && 'type' in filters) {
    if (Array.isArray(filters.type)) {
      filters.type__in = filters.type.map((type) => FileTypeMapper.reverseTransform(type));

      delete filters.type;
    } else {
      filters.type = FileTypeMapper.reverseTransform(filters.type);
    }
  }

  try {
    const response = await this.backendClient.get({
      url: 'file/cgp/search',
      filters,
      latestBy: 'type',
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
