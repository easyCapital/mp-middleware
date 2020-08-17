import { Context } from '../../../../../types';
import { InvalidArgumentException } from '@adonisjs/generic-exceptions';

class CGPScoringController {
  public async knowledge({ params, response, backendApi, universe }: Context) {
    const { customerId, studyId } = params;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const scoring = await backendApi.getCGPKnowledgeScoring(customerId, studyId, universe);

    response.status(200).send(scoring);
  }

  public async risk({ params, response, backendApi, universe }: Context) {
    const { customerId, studyId } = params;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const scoring = await backendApi.getCGPRiskScoring(customerId, studyId, universe);

    response.status(200).send(scoring);
  }
}

export = CGPScoringController;
