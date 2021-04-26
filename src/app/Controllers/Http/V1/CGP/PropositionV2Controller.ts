// import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPPropositionV2Controller {
  public async create({ params, request, response, backendApi, universe }: Context) {
    const { customer, study } = params;
    const content = request.post() as any;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const proposition = await backendApi.createCGPPropositionV2(customer, study, universe, content);

    response.status(200).send(proposition);
  }

  // public async search({ params, request, response, backendApi }: Context) {
  //   const { customer } = params;
  //   const filters = request.input('filters') as Filters;

  //   const propositions = await backendApi.getCGPPropositionV2(customer, filters);

  //   response.status(200).send(propositions);
  // }
}

export = CGPPropositionV2Controller;
