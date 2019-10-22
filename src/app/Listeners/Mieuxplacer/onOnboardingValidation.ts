import { Answer } from 'mieuxplacer-js-api';

import { Context } from '../../../types';

async function onOnboardingValidation(context: Context, answers: Answer, extra?: any) {
  const { session, authenticated, backendApi } = context;

  if (!authenticated) {
    session.put('answers', answers);

    if (extra && extra.email) {
      const { email } = extra;

      const data = await backendApi.createProspect(email);

      return { prospect: data };
    }
  }
}

export default onOnboardingValidation;
