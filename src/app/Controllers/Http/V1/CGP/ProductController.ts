import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPProductController {
  public async search({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;

    const products = await backendApi.getProducts(filters);

    response.status(200).send(products);
  }
}

export = CGPProductController;
