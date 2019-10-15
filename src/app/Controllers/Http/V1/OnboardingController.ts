import { onOnboardingDone } from '../../../Listeners';
import { Context } from '../../../../types';

class OnboardingController {
  public async index({ request, session, response, backendApi }: Context) {
    const withAuthentication = request.input('with-authentication') || false;

    const data = await backendApi.getOnboarding(withAuthentication);
    const sessionAnswers = session.get('answers');

    response.status(200).send({ ...data, answers: sessionAnswers || {} });
  }

  public async getBlocks({ request, session, response, backendApi }) {
    const ids = request.input('ids') || [];

    const { blocks, questions } = await backendApi.getBlocks(ids);

    const sessionAnswers = session.get('answers');
    const answers = {};

    if (sessionAnswers) {
      ids.forEach(id => {
        answers[id] = sessionAnswers[id];
      });
    }

    response.status(200).send({ blocks, questions, answers });
  }

  public async getQuestions({ request, session, response, backendApi }: Context) {
    const ids = request.input('ids') || [];

    const questions = await backendApi.getQuestions(ids);

    const sessionAnswers = session.get('answers');
    const answers = {};

    if (sessionAnswers) {
      ids.forEach(id => {
        answers[id] = sessionAnswers[id];
      });
    }

    response.status(200).send({ questions, answers });
  }

  public async prevalidate({ request, session, response, backendApi }: Context) {
    const answers: any = request.post();

    await backendApi.prevalidateAnswers(answers);

    const oldAnswers = session.get('answers');
    session.put('answers', { ...oldAnswers, ...answers });

    response.status(200).send();
  }

  public async validate({ request, session, response, backendApi, app }: Context) {
    const { answers, extra }: any = request.post();

    await backendApi.prevalidateAnswers(answers);

    session.put('answers', answers);

    const data = await onOnboardingDone(backendApi, app, answers, extra);

    response.status(200).send(data);
  }
}

export = OnboardingController;
