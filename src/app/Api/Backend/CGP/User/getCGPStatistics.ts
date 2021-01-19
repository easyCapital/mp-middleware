import { Statistics } from '@robinfinance/js-api';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import getTodaySaint from '../../Helpers/getTodaySaint';
import BackendApi from '../..';

export default async function getCGPStatistics(this: BackendApi): Promise<Statistics> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/statistics',
    });

    const data = await response.json();

    data.saint = getTodaySaint();

    return data;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
