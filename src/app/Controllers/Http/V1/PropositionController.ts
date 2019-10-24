import { Proposition } from '../../../Models/Proposition';
import { Context } from '../../../../types';
import { NotFoundException } from '../../../Exceptions';
import { onPropositionGeneration } from '../../../Listeners';

class PropositionController {
  public async get({ response, session, authenticated, backendApi }: Context) {
    let proposition: Proposition | undefined;

    if (authenticated) {
      proposition = await backendApi.getLastProposition();
    } else {
      const token = session.get('lastPropositionToken');

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

  public async generate(context: Context) {
    const { request, response, authenticated, backendApi, universe } = context;
    let proposition: Proposition;

    if (authenticated) {
      proposition = await backendApi.generateProposition(universe);
    } else {
      const { answers, prospectId }: any = request.post();

      proposition = await backendApi.generateProspectProposition(universe, prospectId, answers);
    }

    await onPropositionGeneration(context, proposition.getToken());

    response.status(200).send(proposition);
  }

  public async validate({ request, response, backendApi }: Context) {
    const { proposition }: any = request.post();

    await backendApi.validateProposition(proposition);

    response.status(200).send();
  }

  public async downloadByToken({ params, req, res, symfonyApi }: Context) {
    await symfonyApi.downloadProposition(req, res, params.token);
  }
}

export = PropositionController;
