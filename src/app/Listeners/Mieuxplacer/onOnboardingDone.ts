import { Answer } from 'mieuxplacer-js-api';

import * as BackendApi from '../../Api/Backend';

async function onOnboardingDone(answers: Answer, extra: { [key: string]: string }) {
  const { email } = extra;

  const data = await BackendApi.creatProspect(email);

  return data;
}

export default onOnboardingDone;
