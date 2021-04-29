import { Filters } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPContractController {
  public async create({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const { proposition, propositionV2, fees } = request.post() as any;

    if (proposition && propositionV2) {
      throw new InvalidArgumentException();
    }

    let contracts: Contract[] = [];
    if (proposition) {
      contracts = await backendApi.createCGPContractsFromProposition(customer, proposition, fees);
    } else if (propositionV2) {
      contracts = await backendApi.createCGPContractsFromPropositionV2(customer, proposition);
    }

    response.status(200).send(contracts);
  }

  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const contracts: Contract[] = await backendApi.getCGPCustomerContracts(customer, filters);

    response.status(200).send(contracts);
  }
}

export = CGPContractController;
