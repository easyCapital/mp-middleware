import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';
import { Filters } from '@robinfinance/js-api';

class CGPPropositionController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const propositions = await backendApi.getCGPCustomerPropositions(customer, filters);

    response.status(200).send(propositions);
  }

  public async get({ params, response, backendApi }: Context) {
    const { customer, id } = params;

    const proposition = await backendApi.getCGPCustomerProposition(customer, id);

    response.status(200).send(proposition);
  }

  public async create({ params, request, response, backendApi, universe }: Context) {
    const { customer } = params;
    const portfolios = request.post() as any[];

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const proposition = await backendApi.createCGPCustomerProposition(customer, universe, portfolios);

    response.status(200).send(proposition);
  }
}

export = CGPPropositionController;
