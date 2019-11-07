import { Answer, ErrorTypes } from '@robinfinance/js-api';

import { InvalidArgumentException } from '../../Exceptions';
import { Context } from '../../../types';

async function onOnboardingValidation(context: Context, answers: Answer, prospectData?: any) {
  const { session, authenticated, backendApi } = context;

  if (!authenticated) {
    session.put('answers', answers);

    if (prospectData && prospectData.email) {
      const { email, utmCampaign, utmSource, utmMedium } = prospectData;
      const data = await backendApi.createProspect({
        email,
        utm_campaign: utmCampaign,
        utm_source: utmSource,
        utm_medium: utmMedium,
      });

      return { prospect: data };
    }

    throw new InvalidArgumentException({ email: ErrorTypes.REQUIRED });
  }
}

export default onOnboardingValidation;
