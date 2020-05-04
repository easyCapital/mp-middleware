import { Filters, PropositionFeeDTO } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

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

  public async signatureUrl({ params, response, backendApi, app, origin }: Context) {
    const { customer, contract } = params;

    const callbackUrl = app.contractSignatureCallback
      ? origin + app.contractSignatureCallback.interpolate({ customer, contract })
      : undefined;

    if (!callbackUrl) {
      throw new InvalidArgumentException("Aucune URL de callback n'a été fourni.");
    }

    const url = await backendApi.getCGPContractSignatureUrl(contract, callbackUrl);

    response.status(200).send(url);
  }

  public async validateSignature({ params, response, backendApi }: Context) {
    const { contract } = params;

    const data = await backendApi.validateCGPContractSignature(contract);

    response.status(200).send(data);
  }
}

export = CGPContractController;
