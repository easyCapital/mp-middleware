import { Answer } from '@robinfinance/js-api';

import { Context } from '../../../types';
import { Question } from '../../Models/Onboarding';

async function onOnboardingFetch(context: Context, questions: { [key: string]: Question }) {
  const { session, authenticated, backendApi } = context;

  let answers: Answer = {};

  if (authenticated) {
    const filters = { question__in: Object.keys(questions) };
    const rawAnswers = await backendApi.getAnswers(filters);

    answers = rawAnswers.reduce((previous, answer) => ({ ...previous, ...answer.toJSON() }), {});
  } else {
    const sessionAnswers = session.get('answers');

    if (sessionAnswers) {
      answers = sessionAnswers;
    }
  }

  return { answers };
}

export default onOnboardingFetch;