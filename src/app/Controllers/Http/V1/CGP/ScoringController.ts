import { Context } from '../../../../../types';
import { InvalidArgumentException } from '@adonisjs/generic-exceptions';

class CGPScoringController {
  public async knowledge({ params, response, backendApi, universe }: Context): Promise<void> {
    const { customerId, studyId } = params;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const scoring = await backendApi.getCGPKnowledgeScoring(customerId, studyId, universe);

    response.status(200).send(scoring);
  }

  public async risk({ params, response, backendApi, universe }: Context): Promise<void> {
    const { customerId, studyId } = params;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const scoring = await backendApi.getCGPRiskScoring(customerId, studyId, universe);

    response.status(200).send(scoring);
  }

  public async afiEsca({ params, response, backendApi, universe }: Context): Promise<void> {
    const { customerId, studyId } = params;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const scoring = await backendApi.getCGPAfiEscaProfileScoring(customerId, studyId, universe);

    response.status(200).send(scoring);
  }

  public async serenalis({ params, response, backendApi, universe }: Context): Promise<void> {
    const { customerId, studyId } = params;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const scoring = await backendApi.getCGPSerenalisProfileScoring(customerId, studyId, universe);

    response.status(200).send(scoring);
  }
}

export = CGPScoringController;
