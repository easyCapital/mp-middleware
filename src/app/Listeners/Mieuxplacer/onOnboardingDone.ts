import { Answer } from 'mieuxplacer-js-api';
import BackendApi from '../../Api/Backend';

async function onOnboardingDone(backendApi: BackendApi, answers: Answer, extra: { [key: string]: string }) {
  const { email } = extra;

  const data = await backendApi.creatProspect(email);

  return data;
}

export default onOnboardingDone;
