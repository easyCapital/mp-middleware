import { QuestionAnswer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { formatAnswerBody } from '../Helpers';
import BackendApi from '..';

export default async function getRiskAdvice(
  this: BackendApi,
  universe: string | undefined,
  answers: QuestionAnswer,
): Promise<{ key: string }> {
  try {
    const formattedAnswers = formatAnswerBody(answers);

    const response = await this.backendClient.post(
      { url: 'recommendation/customer/get_risk_advice' },
      { universe, answers: formattedAnswers },
    );

    const data = await response.json();

    return { key: data.risk_advice };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
