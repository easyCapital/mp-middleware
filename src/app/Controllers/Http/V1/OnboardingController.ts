import * as BackendApi from '../../../Api/Backend';
import { onOnboardingDone } from '../../../Listeners';

class OnboardingController {
  public async index({ request, session, response }) {
    const withAuthentication = request.input('with-authentication') || false;

    const data = await BackendApi.getOnboarding(withAuthentication);
    const answers = session.get('answers');

    response.status(200).send({ ...data, answers });
  }

  public async getQuestions({ request, session, response }) {
    const ids = request.input('ids');

    const questions = await BackendApi.getQuestions(ids);

    const sessionAnswers = session.get('answers');
    const answers = {};

    if (sessionAnswers) {
      ids.forEach(id => {
        answers[id] = sessionAnswers[id];
      });
    }

    response.status(200).send({ questions, answers });
  }

  public async prevalidate({ request, session, response }) {
    const answers = request.post();

    await BackendApi.prevalidateAnswers(answers);

    const oldAnswers = session.get('answers');
    session.put('answers', { ...oldAnswers, ...answers });

    response.status(200).send();
  }

  public async validate({ request, session, response }) {
    const app = request.header('MP-App');
    const { answers, extra } = request.post();

    await BackendApi.prevalidateAnswers(answers);

    session.put('answers', answers);

    const data = await onOnboardingDone(app, answers, extra);

    response.status(200).send(data);
  }
}

export = OnboardingController;
