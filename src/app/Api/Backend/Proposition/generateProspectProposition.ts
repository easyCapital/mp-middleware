import { Answer } from 'mieuxplacer-js-api';

import { formatAnswerBody } from '../Helpers';
import { Exception } from '../../../Exceptions';
import { Proposition } from '../../../Models/Proposition';
import BackendApi from '..';

export default async function generateProspectProposition(
  this: BackendApi,
  universe: string | undefined,
  prospectId: string,
  answers: Answer,
): Promise<Proposition> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    const response = await this.backendClient.post(
      { url: 'recommendation/customer/generate_prospect_proposition' },
      { universe, prospect: prospectId, answers: formattedAnswers },
    );

    const data = await response.json();

    const proposition = await this.getPropositionByToken(data.token);

    proposition.setToken(data.token);

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
