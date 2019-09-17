import * as BackendApi from '../../../Api/Backend';

class OnboardingController {
  private async index() {
    return BackendApi.getOnboarding();
  }

  private async prevalidate({ request }) {
    return BackendApi.prevalidateAnswers(request.post());
  }
}

export = OnboardingController;
