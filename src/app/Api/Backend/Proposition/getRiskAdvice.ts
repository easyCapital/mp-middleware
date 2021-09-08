import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function getRiskAdvice(
  this: BackendApi,
  universe: string | undefined,
  answers: Answer,
): Promise<{ key: string }> {
  try {
    const response = await this.backendClient.post(
      { url: 'recommendation/customer/get_risk_advice' },
      { universe, answers },
    );

    const data = await response.json();

    return { key: data.risk_advice };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
