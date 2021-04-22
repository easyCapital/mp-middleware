import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPPropositionV2Controller {
  //   public async search({ params, request, response, backendApi }: Context) {
  //     const { customer } = params;
  //     const filters = request.input('filters') as Filters;

  //     const propositions = await backendApi.getCGPCustomerPropositions(customer, filters);

  //     response.status(200).send(propositions);
  //   }

  public async create({ params, request, response, backendApi, universe }: Context) {
    const { customer } = params;
    const content = request.post() as any;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const proposition = await backendApi.createCGPCustomerProposition(customer, universe, content);

    response.status(200).send(proposition);
  }
}

export = CGPPropositionV2Controller;
