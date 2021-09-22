import { Analysis } from '../../../../Models/Analysis';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function generateCustomerAnalysis(this: BackendApi, id: number): Promise<Analysis> {
  try {
    const response = await this.backendClient.post({
      url: `cgp/customer/${id}/asset_freezing_blacklist_searches/create`,
    });

    const data = await response.json();

    const analysis = new Analysis(data.asset_freezing_search_analysis);

    return analysis;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
