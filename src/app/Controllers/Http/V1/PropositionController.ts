import * as SymfonyApi from '../../../Api/Symfony';
import { Context } from '../../../../types';

class PropositionController {
  public async getByToken({ params, response, backendApi }: Context) {
    const { token } = params;
    const proposition = await backendApi.getPropositionByToken(token);

    response.status(200).send(proposition);
  }

  public async generate({ request, response, backendApi, universe }: Context) {
    const { prospectId, answers }: any = request.post();

    const proposition = await backendApi.generateProspectProposition(universe, prospectId, answers);

    response.status(200).send(proposition);
  }

  public async validate({ request, response, symfonySession }: Context) {
    const { proposition }: any = request.post();

    await SymfonyApi.validateProposition(proposition, symfonySession);

    response.status(200).send();
  }
}

export = PropositionController;
