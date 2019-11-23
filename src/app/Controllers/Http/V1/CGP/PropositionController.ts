import { Context } from '../../../../../types';

class CGPPropositionController {
  public async search({ params, response, backendApi }: Context) {
    const { customer } = params;

    const propositions = await backendApi.getCGPCustomerPropositions(customer);

    response.status(200).send(propositions);
  }
}

export = CGPPropositionController;
