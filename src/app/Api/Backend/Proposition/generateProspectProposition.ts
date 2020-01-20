import { QuestionAnswer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { Proposition } from '../../../Models/Proposition';
import { formatAnswerBody, getPropositionDetails } from '../Helpers';
import BackendApi from '..';

export default async function generateProspectProposition(
  this: BackendApi,
  universe: string | undefined,
  prospectId: string,
  answers: QuestionAnswer,
): Promise<Proposition> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    const response = await this.backendClient.post(
      { url: 'recommendation/customer/generate_prospect_proposition' },
      { universe, prospect: prospectId, answers: formattedAnswers },
    );

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
