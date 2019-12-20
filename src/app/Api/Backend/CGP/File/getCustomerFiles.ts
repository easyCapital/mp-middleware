import { Filters } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerFiles(this: BackendApi, filters?: Filters): Promise<File[]> {
  try {
    const response = await this.backendClient.get({
      url: 'file/cgp/search',
      filters,
    });
    const data = await response.json();

    const files = data.map(item => new File(item));

    return files;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
