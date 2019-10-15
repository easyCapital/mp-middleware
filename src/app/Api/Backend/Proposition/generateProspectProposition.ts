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
    throw new BackendException(exception);
  }
}
