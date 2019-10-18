import { Answer } from 'mieuxplacer-js-api';
import BackendApi from '../../Api/Backend';

async function onOnboardingDone(backendApi: BackendApi, answers: Answer, extra: { [key: string]: any }) {
  const { email } = extra;

  const data = await backendApi.createProspect(email);

  return { prospect: data };
}

export default onOnboardingDone;
