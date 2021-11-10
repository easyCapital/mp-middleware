import { Household } from '../../../../Models/Household';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getHousehold(this: BackendApi, id: string): Promise<Household> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/household/search',
      filters: { id },
      pagination: { page: 1, perPage: 1 },
    });

    const data = await response.json();

    if (data.length > 0) {
      const household = new Household(data[0]);

      return household;
    }
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
