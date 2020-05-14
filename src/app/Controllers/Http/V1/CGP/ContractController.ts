import { Filters, PropositionFeeDTO } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Context } from '../../../../../types';

class CGPContractController {
  public async create({ params, request, response, backendApi }: Context) {
    const { customer, proposition } = params;
    const fees = request.post() as PropositionFeeDTO[];

    const contracts = await backendApi.createCGPContractsFromProposition(customer, proposition, fees);

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
