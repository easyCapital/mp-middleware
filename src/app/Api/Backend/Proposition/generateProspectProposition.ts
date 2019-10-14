import { Answer } from 'mieuxplacer-js-api';

import { formatAnswerBody } from '../Helpers';
import BackendApi from '..';

export default async function generateProspectProposition(
  this: BackendApi,
  universe: string | undefined,
  prospectId: string,
  answers: Answer,
) {
  const formattedAnswers = formatAnswerBody(answers);

  const response = await this.backendClient.post(
    { url: 'recommendation/customer/generate_prospect_proposition' },
    { universe, prospect: prospectId, answers: formattedAnswers },
  );

  const data = await response.json();

  if (!response.ok) {
    return data;
    // throw new ProspectException(data);
  }

  return data;
}
