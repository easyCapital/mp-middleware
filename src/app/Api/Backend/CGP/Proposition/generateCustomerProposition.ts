import { Exception } from '../../../../Exceptions';
import { Proposition } from '../../../../Models/Proposition';
import { BackendException } from '../../Exceptions';
import { getPropositionDetails } from '../../Helpers';
import BackendApi from '../..';

export default async function generateCustomerProposition(
  this: BackendApi,
  customer: string,
  universe?: string,
  configKey?: string,
  study?: string,
): Promise<Proposition> {
  try {
    const body: any = { universe, customer };

    if (study) {
      body.study = study;
    }

    if (configKey) {
      body.config_key = configKey;
    }

    const response = await this.backendClient.post({ url: 'proposition/cgp/generate' }, body);

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
