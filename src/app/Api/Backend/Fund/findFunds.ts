import { Fund } from '../../../Models/Proposition';
import { Exception } from '../../../Exceptions';

const BackendClient = use('BackendClient');

export default async function findFunds(filters: { [filter: string]: string | string[] }): Promise<Fund[]> {
  try {
    const response = await BackendClient.get({
      url: 'line/search',
      filters,
    });
    const data = await response.json();

    const funds: Fund[] = [];

    data.forEach(line => {
      const fund = new Fund(line);

      funds.push(fund);
    });

    return funds;
  } catch (error) {
    throw new Exception(error);
  }
}
