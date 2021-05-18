import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPProductController {
  public async index({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;

    const products = await backendApi.getProducts(filters);

    response.status(200).send(products);
  }

  public async get({ params, response, backendApi }: Context) {
    const { id } = params;

    const product = await backendApi.getProduct(id);

    response.status(200).send(product);
  }
}

export = CGPProductController;
