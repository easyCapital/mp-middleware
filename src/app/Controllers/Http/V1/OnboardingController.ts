import { onOnboardingFetch, onOnboardingPrevalidation, onOnboardingValidation } from '../../../Listeners';
import { Context } from '../../../../types';

class OnboardingController {
  public async index(context: Context) {
    const { request, response, backendApi } = context;
    const withAuthentication = request.input('with-authentication') || false;
    const configKey = request.input('config-key');

    let data = await backendApi.getOnboarding(withAuthentication, configKey);
    const extra = await onOnboardingFetch(context);

    if (extra) {
      data = { ...data, ...extra };
    }

    response.status(200).send(data);
  }

  public async getBlocks(context: Context) {
    const { request, response, backendApi } = context;
    const ids = request.input('ids') || [];
    const configKey = request.input('config-key');

    let data = await backendApi.getBlocks(configKey, ids);
    const extra = await onOnboardingFetch(context);

    if (extra) {
      data = { ...data, ...extra };
    }

    response.status(200).send(data);
  }

  public async getQuestions(context: Context) {
    const { request, response, backendApi } = context;
    const ids = request.input('ids') || [];
    const configKey = request.input('config-key');

    const questions = await backendApi.getQuestions(configKey, ids);
    const extra = await onOnboardingFetch(context);

    let data = { questions };

    if (extra) {
      data = { ...data, ...extra };
    }

    response.status(200).send(data);
  }

  public async prevalidate(context: Context) {
    const { request, response, backendApi } = context;
    const answers: any = request.post();

    await backendApi.prevalidateAnswers(answers);
    await onOnboardingPrevalidation(context, answers);

    response.status(200).send();
  }

  public async validate(context: Context) {
    const { request, response } = context;
    const { answers, extra }: any = request.post();

    const data = await onOnboardingValidation(context, answers, extra);

    response.status(200).send(data || {});
  }
}

export = OnboardingController;
