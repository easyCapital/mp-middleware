import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPContractFileController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer, contract } = params;
    let filters = request.input('filters') as Filters;

    filters = customer
      ? { ...filters, user: customer }
      : contract
      ? { ...filters, contracts: contract }
      : { ...filters };

    const files = await backendApi.getCGPCustomerFiles(filters);

    response.status(200).send(files);
  }

  public async download({ params, req, res, backendApi }: Context) {
    const { id } = params;

    await backendApi.downloadCGPCustomerFile(req, res, id);
  }
}

export = CGPContractFileController;
