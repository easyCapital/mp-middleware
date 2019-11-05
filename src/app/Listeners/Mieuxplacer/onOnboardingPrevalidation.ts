import { Answer } from '@robinfinance/js-api';

import { Context } from '../../../types';

async function onOnboardingPrevalidation(context: Context, answers: Answer) {
  const { session, authenticated, backendApi } = context;

  if (authenticated) {
    await backendApi.createAnswers(answers);
  } else {
    const oldAnswers = session.get('answers');

    session.put('answers', { ...oldAnswers, ...answers });
  }
}

export default onOnboardingPrevalidation;
