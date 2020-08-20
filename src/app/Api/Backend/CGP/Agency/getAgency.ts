import { Agency } from '../../../../Models/Agency';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getAgency(this: BackendApi): Promise<Agency> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/agency/',
    });

    const data = await response.json();

    const agency = new Agency(data);

    return agency;
  } catch (exception) {
    throw new Exception(exception);
  }
}
