import { Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerPropositions(this: BackendApi, customerId: string): Promise<Proposition[]> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition/cgp/search',
      filters: { user_id: customerId },
      orderBy: { key: 'created', type: 'desc' },
    });
    const data = await response.json();

    const propositions = data.map(item => new Proposition(item));

    return propositions;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
