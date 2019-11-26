import { Filters } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Context } from '../../../../../types';

class CGPContractFileController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer, contract } = params;
    let filters = request.input('filters') as Filters;

    filters = customer ? { ...filters, user: customer } : contract ? { ...filters, contract } : { ...filters };

    const files: File[] = await backendApi.getCGPCustomerFiles(filters);

    response.status(200).send(files);
  }
}

export = CGPContractFileController;
