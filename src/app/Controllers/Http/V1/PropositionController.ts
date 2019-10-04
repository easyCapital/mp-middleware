import * as BackendApi from '../../../Api/Backend';
import * as SymfonyApi from '../../../Api/Symfony';

class PropositionController {
  public async getByToken({ params, response }) {
    const { token } = params;

    const proposition = await BackendApi.getPropositionByToken(token);

    response.status(200).send(proposition);
  }

  public async generate({ request, response }) {
    const { universe } = request;
    const { prospectId, answers } = request.post();

    const proposition = await BackendApi.generateProspectProposition(universe, prospectId, answers);

    response.status(200).send(proposition);
  }

  public async validate({ request, response }) {
    const { symfonySession } = request;
    const { proposition } = request.post();

    await SymfonyApi.validateProposition(proposition, symfonySession);

    response.status(200).send();
  }
}

export = PropositionController;
