import { Filters } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Context } from '../../../../../types';

class CGPContractController {
  public async create({ params, response, backendApi }: Context) {
    const { customer, proposition } = params;

    const contracts = await backendApi.createCGPContractsFromProposition(customer, proposition);

    response.status(200).send(contracts);
  }

  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const contracts: Contract[] = await backendApi.getCGPCustomerContracts(customer, filters);

    response.status(200).send(contracts);
  }

  public async signatureUrl({ params, response, backendApi, app, origin }: Context) {
    const { customer, contract } = params;
    const callbackUrl = app.signatureCallback
      ? origin + app.signatureCallback.interpolate({ customer, contract })
      : null;

    const url = await backendApi.getCGPSignatureUrl(contract, callbackUrl);

    response.status(200).send(url);
  }

  public async validateSignature({ params, response, backendApi }: Context) {
    const { contract } = params;

    const data = await backendApi.validateCGPSignature(contract);

    response.status(200).send(data);
  }
}

export = CGPContractController;
