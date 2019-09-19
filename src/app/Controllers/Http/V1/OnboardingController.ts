import * as BackendApi from '../../../Api/Backend';

class OnboardingController {
  public async index({ request, session, response }) {
    const withAuthentication = request.input('with-authentication') || false;

    const data = await BackendApi.getOnboarding(withAuthentication);
    const answers = session.get('answers');

    response.status(200).send({ ...data, answers });
  }

  public async prevalidate({ request, session, response }) {
    await BackendApi.prevalidateAnswers(request.post());

    session.put('answers', request.post());

    response.status(200).send();
  }
}

export = OnboardingController;
