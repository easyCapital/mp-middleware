import { ErrorTypes, Answer } from '@robinfinance/js-api';

import { InvalidArgumentException } from '../../Exceptions';
import { Context } from '../../../types';

async function onOnboardingValidation(context: Context, answers: Answer, userData?: any) {
  const { backendApi, universe } = context;

  if (userData && userData.email) {
    const { email } = userData;

    const data = await backendApi.createCGPCustomer({ email, universe });

    await backendApi.createCGPAnswers(data.id, answers);

    return data;
  }

  throw new InvalidArgumentException({ email: ErrorTypes.REQUIRED });
}

export default onOnboardingValidation;
