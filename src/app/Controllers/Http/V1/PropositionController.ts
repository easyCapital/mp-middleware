import { Proposition } from '../../../Models/Proposition';
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

  public async generate({ request, session, response, backendApi, symfonyApi, universe, authenticated }: Context) {
    const { answers, prospectId }: any = request.post();
    const proposition = authenticated
      ? new Proposition({})
      : await backendApi.generateProspectProposition(universe, prospectId, answers);
    symfonyApi.sendPropositionByEmail(proposition.getToken());
    session.put('lastPropositionToken', proposition.getToken());
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
