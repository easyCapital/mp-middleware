import { Answer } from '@robinfinance/js-api';

import { Context } from '../../../types';

async function onOnboardingFetch(context: Context): Promise<{ answers: Answer[] }> {
  const { session, authenticated, backendApi } = context;

  let answers: Answer[] = [];

  if (authenticated) {
    const rawAnswers = await backendApi.getAnswers();

    answers = rawAnswers.map((item) => item.toJSON());
  } else {
    const sessionAnswers = session.get('answers');

    if (sessionAnswers) {
      answers = sessionAnswers;
    }
  }

  return { answers };
}

export default onOnboardingFetch;
