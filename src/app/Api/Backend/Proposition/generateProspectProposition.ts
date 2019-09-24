import { Answer } from 'mieuxplacer-js-api';

import { formatAnswerBody } from '../Helpers';

const BackendClient = use('BackendClient');

export default async function generateProspectProposition(universe: string, prospectId: string, answers: Answer) {
  const formattedAnswers = formatAnswerBody(answers);

  const response = await BackendClient.post(
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
