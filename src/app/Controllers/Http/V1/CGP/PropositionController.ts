import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';
import * as SlackAPI from '../../../../Api/Slack';

class CGPPropositionController {
  public async search({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const propositions = await backendApi.getCGPCustomerPropositions(customer, filters);

    response.status(200).send(propositions);
  }

  public async create({ params, request, response, backendApi, universe }: Context): Promise<void> {
    const { customer } = params;
    const portfolios = request.post() as any[];

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const proposition = await backendApi.createCGPCustomerProposition(customer, universe, portfolios);

    response.status(200).send(proposition);
  }

  public async get({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const proposition = await backendApi.getCGPProposition(id);

    response.status(200).send(proposition);
  }

  public async generate({ params, request, response, backendApi, universe }: Context): Promise<void> {
    const { customer } = params;
    const configKey = (request.post() as any).configKey;

    const proposition = await backendApi.generateCGPCustomerProposition(customer, universe, configKey);

    response.status(200).send(proposition);
  }

  public async getStudyPropositions({ params, response, backendApi }: Context): Promise<void> {
    const { study } = params;

    const propositions = await backendApi.getCGPStudyPropositions(study);

    response.status(200).send(propositions);
  }

  public async createStudyProposition({ params, request, response, backendApi, universe }: Context): Promise<void> {
    const { customer, study } = params;
    const portfolios = request.post() as any[];

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const proposition = await backendApi.createCGPStudyProposition(customer, study, universe, portfolios);

    response.status(200).send(proposition);
  }

  public async validateExternalProposition({ params, request, response, backendApi, origin }: Context): Promise<void> {
    const { study, task } = params;
    const data = request.post() as { email: string; agency: string | undefined; product: string | undefined };

    await backendApi.finishStudyTask(study, task);

    if (data.product) {
      await SlackAPI.sendOtherProductName(origin, data.email, data.product, data.agency);
    }

    response.status(200).send();
  }
}

export = CGPPropositionController;
