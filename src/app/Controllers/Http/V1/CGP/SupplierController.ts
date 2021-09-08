import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPSupplierController {
  public async index({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const suppliers = await backendApi.getSuppliers(filters);

    response.status(200).send(suppliers);
  }

  public async get({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const supplier = await backendApi.getSupplier(id);

    response.status(200).send(supplier);
  }
}

export = CGPSupplierController;
