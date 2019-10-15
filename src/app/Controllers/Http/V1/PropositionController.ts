import { Proposition } from '../../../Models/Proposition';
import * as SymfonyApi from '../../../Api/Symfony';
import { Context } from '../../../../types';
import { NotFoundException } from '../../../Exceptions';

class PropositionController {
  public async get({ response, session, authenticated, backendApi }: Context) {
    let proposition: Proposition | undefined;

    if (authenticated) {
      proposition = new Proposition({});
      // proposition = await backendApi.getLastProposition();
    } else {
      const token = session.get('lastPropositionToken');

      console.log(token);

      if (token) {
        proposition = await backendApi.getPropositionByToken(token);
      }
    }

    if (!proposition) {
      throw new NotFoundException('Aucune proposition trouvée.');
    }

    response.status(200).send(proposition);
  }

  public async getByToken({ params, response, backendApi }: Context) {
    const { token } = params;
    const proposition = await backendApi.getPropositionByToken(token);

    response.status(200).send(proposition);
  }

  public async generate({ request, session, response, authenticated, backendApi, universe }: Context) {
    const { answers }: any = request.post();

    let proposition: Proposition;

    if (authenticated) {
      proposition = new Proposition({});
    } else {
      const { prospectId }: any = request.post();

      proposition = await backendApi.generateProspectProposition(universe, prospectId, answers);

      session.put('lastPropositionToken', proposition.getToken());
    }

    response.status(200).send(proposition);
  }

  public async validate({ request, response, symfonySession }: Context) {
    const { proposition }: any = request.post();

    await SymfonyApi.validateProposition(proposition, symfonySession);

    response.status(200).send();
  }
}

export = PropositionController;
