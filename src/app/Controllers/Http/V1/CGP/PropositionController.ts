import { Context } from '../../../../../types';

class CGPPropositionController {
  public async search({ params, response, backendApi }: Context) {
    const { customer } = params;

    const propositions = await backendApi.getCGPCustomerPropositions(customer);

    response.status(200).send(propositions);
  }

  public async get({ params, response, backendApi }: Context) {
    const { customer, id } = params;

    const proposition = await backendApi.getCGPCustomerProposition(customer, id);

    response.status(200).send(proposition);
  }
}

export = CGPPropositionController;
