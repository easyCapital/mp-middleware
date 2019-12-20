import { Exception } from '../../../../Exceptions';
import { Proposition } from '../../../../Models/Proposition';
import { getPropositionDetails } from '../../Helpers';
import BackendApi from '../..';
import { Filters } from '@robinfinance/js-api';

export default async function generateCustomerProposition(
  this: BackendApi,
  universe: string | undefined,
  customerId: string,
  configKey: string | undefined,
): Promise<Proposition> {
  try {
    const postParams: Filters = { universe, customer: customerId };
    if (configKey) {
      postParams.config_key = configKey;
    }
    const response = await this.backendClient.post({ url: 'proposition/cgp/generate' }, postParams);

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
