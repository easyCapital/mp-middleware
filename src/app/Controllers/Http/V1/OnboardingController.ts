import * as BackendApi from '../../../Api/Backend';

class OnboardingController {
  private async index({ response }) {
    const data = await BackendApi.getOnboarding();

    response.send(data);
  }
}

export = OnboardingController;
