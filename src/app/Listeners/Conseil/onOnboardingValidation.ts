import { ErrorTypes } from '@robinfinance/js-api';

import { InvalidArgumentException } from '../../Exceptions';
import { Context } from '../../../types';

async function onOnboardingValidation(context: Context, prospectData?: any) {
  const { backendApi } = context;

  if (prospectData && prospectData.email) {
    const { email } = prospectData;

    const data = await backendApi.createProspect({
      email,
    });

    return { prospect: data };
  }

  throw new InvalidArgumentException({ email: ErrorTypes.REQUIRED });
}

export default onOnboardingValidation;
