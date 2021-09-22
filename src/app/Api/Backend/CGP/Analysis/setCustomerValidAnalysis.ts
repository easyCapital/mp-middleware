import { Analysis } from '../../../../Models/Analysis';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function setCustomerValidAnalysis(
  this: BackendApi,
  id: number,
  comment?: string,
): Promise<Analysis> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${id}/asset_freezing_blacklist_searches/create_manual`,
      },
      {
        comment,
      },
    );
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
