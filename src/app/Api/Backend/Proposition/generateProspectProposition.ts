import { Answer } from 'mieuxplacer-js-api';

import { formatAnswerBody } from '../Helpers';
import BackendException from '../Exceptions/BackendException';
import BackendApi from '..';

export default async function generateProspectProposition(
  this: BackendApi,
  universe: string | undefined,
  prospectId: string,
  answers: Answer,
) {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    const response = await this.backendClient.post(
      { url: 'recommendation/customer/generate_prospect_proposition' },
      { universe, prospect: prospectId, answers: formattedAnswers },
    );

    const data = await response.json();

    const proposition = this.getPropositionByToken(data.token);

    return proposition;
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
