import { Exception } from '../../../../Exceptions';
import { BackendException, PortfolioException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createPropositionV2(
  this: BackendApi,
  customerId: string,
  study: string,
  universe: string,
  contents: { amount: number; product: number }[],
): Promise<any> {
  // promise should be proposition V2 TYPE
  try {
    const response = await this.backendClient.post(
      {
        url: 'proposition_v2/cgp/create',
      },
      {
        customer: customerId,
        study,
        universe,
        contents,
      },
    );

    const data = await response.json();

    // return getPropositionDetails(this, data);
    return data;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (error.contents && error.contents.length > 0) {
        throw new PortfolioException(error.contents);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
