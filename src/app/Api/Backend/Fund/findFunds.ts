import { Fund } from '../../../Models/Proposition';
import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function findFunds(
  this: BackendApi,
  filters: { [filter: string]: string | string[] },
): Promise<Fund[]> {
  try {
    const response = await this.backendClient.get({
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
  } catch (exception) {
    if (exception.json) {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    } else if (exception.message) {
      throw new Exception(exception.message);
    }

    throw new Exception(exception);
  }
}
