import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { Proposition } from '../../../../Models/Proposition';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPPropositionController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const propositions = await backendApi.getCGPCustomerPropositions(customer, filters);

    response.status(200).send(propositions);
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

  public async get({ params, response, backendApi }: Context) {
    const { id } = params;

    const proposition = await backendApi.getCGPProposition(id);

    response.status(200).send(proposition);
  }

  public async generate(context: Context) {
    const { params, request, response, backendApi, universe } = context;
    const { customer } = params;
    const configKey = (request.post() as any).configKey;

    const proposition: Proposition = await backendApi.generateCGPCustomerProposition(universe, customer, configKey);

    response.status(200).send(proposition);
  }

  public async downloadMissionReport({ params, req, res, backendApi }: Context) {
    const { id } = params;

    await backendApi.downloadCGPMissionReport(req, res, id);
  }
}

export = CGPPropositionController;
