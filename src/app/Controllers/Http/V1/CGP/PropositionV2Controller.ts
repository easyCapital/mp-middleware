import { Filters, PropositionContentDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPPropositionV2Controller {
  public async create({ params, request, response, backendApi, universe }: Context): Promise<void> {
    const { customer, study } = params;

    const content = request.post() as PropositionContentDTO[];

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const proposition = await backendApi.createCGPPropositionV2(customer, study, universe, content);

    response.status(200).send(proposition);
  }

  public async search({ params, request, response, backendApi }: Context): Promise<void> {
    const { study } = params;
    const filters = request.input('filters') as Filters;

    const propositions = await backendApi.getCGPPropositionV2(study, filters);

    response.status(200).send(propositions);
  }
}

export = CGPPropositionV2Controller;
