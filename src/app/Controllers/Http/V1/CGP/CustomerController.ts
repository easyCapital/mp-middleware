import { Filters, Pagination } from '@robinfinance/js-api';
import InvalidArgumentException from '../../../../Exceptions/InvalidArgumentException';

import { Context } from '../../../../../types';

class CGPCustomerController {
  public async create(context: Context) {
    const { request, response, backendApi, universe } = context;
    const { email }: any = request.post();

    if (!universe) {
      throw new InvalidArgumentException("L'entête MP-Universe est obligatoire.");
    }

    const data = await backendApi.createCGPCustomer({
      email,
      universe,
    });

    response.status(200).send({ id: data.id });
  }

  public async search({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;

    const customers = await backendApi.searchCGPCustomer(pagination, filters);

    response.status(200).send(customers);
  }

  public async get({ params, response, backendApi }: Context) {
    const { id } = params;

    const customer = await backendApi.getCGPCustomer(id);

    response.status(200).send(customer);
  }
}

export = CGPCustomerController;
