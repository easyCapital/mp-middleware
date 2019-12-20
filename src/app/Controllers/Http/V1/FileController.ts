import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../types';

class FileController {
  public async search({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const formattedFilters: Filters = contract ? { ...filters, contracts: contract } : filters;

    const files = await backendApi.getFiles(formattedFilters);

    response.status(200).send(files);
  }
}

export = FileController;
